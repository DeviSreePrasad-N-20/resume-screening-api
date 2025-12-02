const asyncHandler = require('express-async-handler');
const Candidate = require('../models/Candidate');
const { getPagination } = require('../utils/pagination');

exports.createCandidate = asyncHandler(async (req, res) => {
  const { name, email, phone, skills, experienceYears, metadata } = req.body;
  const candidate = await Candidate.create({
    name, email, phone, skills: skills || [], experienceYears: experienceYears || 0, metadata
  });
  res.status(201).json(candidate);
});

exports.getCandidates = asyncHandler(async (req, res) => {
  const { search, status, skills } = req.query;
  const { page, limit, skip } = getPagination(req);

  const filter = {};
  if (status) filter.status = status;
  if (skills) filter.skills = { $in: skills.split(',').map(s => s.trim()) };

  if (search) {
    filter.$text = { $search: search };
  }

  const total = await Candidate.countDocuments(filter);
  const candidates = await Candidate.find(filter)
    .sort({ createdAt: -1 })
    .skip(skip)
    .limit(limit);

  res.json({ total, page, limit, data: candidates });
});

exports.getCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  res.json(candidate);
});

exports.updateCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findByIdAndUpdate(req.params.id, req.body, { new: true });
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  res.json(candidate);
});

exports.deleteCandidate = asyncHandler(async (req, res) => {
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  await candidate.remove();
  res.json({ message: 'Candidate deleted' });
});

exports.uploadCandidateResume = asyncHandler(async (req, res) => {
  // after uploading resume to cloudinary (see upload controller), update candidate
  const { url, public_id } = req.body; // you can accept as body after successful cloud upload
  const candidate = await Candidate.findById(req.params.id);
  if (!candidate) {
    res.status(404);
    throw new Error('Candidate not found');
  }
  candidate.resume = { url, public_id };
  await candidate.save();
  res.json(candidate);
});
