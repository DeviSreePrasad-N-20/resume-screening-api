const asyncHandler = require('express-async-handler');
const Candidate = require('../models/Candidate');
const { calculateScore } = require('../utils/scoring');

exports.scoreCandidate = asyncHandler(async (req, res) => {
  // POST /api/screening/:candidateId/score
  const { jobKeywords = [], assessmentScore = null } = req.body;
  const candidate = await Candidate.findById(req.params.candidateId);
  if (!candidate) {
    res.status(404); throw new Error('Candidate not found');
  }

  const score = calculateScore({ candidate, jobKeywords, assessmentScore });
  candidate.score = score;
  // optionally auto change status if score high
  if (score >= 70) candidate.status = 'shortlisted';
  else if (score >= 40) candidate.status = 'screened';
  else candidate.status = 'rejected';
  await candidate.save();

  res.json({ candidateId: candidate._id, score: candidate.score, status: candidate.status });
});

exports.getShortlist = asyncHandler(async (req, res) => {
  const shortlist = await Candidate.find({ status: 'shortlisted' }).sort({ score: -1 });
  res.json(shortlist);
});
