const asyncHandler = require('express-async-handler');
const Candidate = require('../models/Candidate');
const mongoose = require('mongoose');

// GET /api/reports/summary
exports.summary = asyncHandler(async (req, res) => {
  const totalApplicants = await Candidate.countDocuments();
  const byStatus = await Candidate.aggregate([
    { $group: { _id: '$status', count: { $sum: 1 } } }
  ]);
  const avgScore = await Candidate.aggregate([
    { $match: { score: { $exists: true } } },
    { $group: { _id: null, avg: { $avg: '$score' } } }
  ]);
  res.json({
    totalApplicants,
    byStatus,
    avgScore: avgScore[0] ? Math.round(avgScore[0].avg * 100)/100 : 0
  });
});

// GET /api/reports/monthly?year=2025
exports.monthly = asyncHandler(async (req, res) => {
  const year = parseInt(req.query.year || (new Date()).getFullYear());
  // group by month based on createdAt
  const monthly = await Candidate.aggregate([
    {
      $match: {
        createdAt: {
          $gte: new Date(`${year}-01-01T00:00:00Z`),
          $lte: new Date(`${year}-12-31T23:59:59Z`)
        }
      }
    },
    {
      $group: {
        _id: { $month: '$createdAt' },
        count: { $sum: 1 },
        avgScore: { $avg: '$score' }
      }
    },
    { $sort: { '_id': 1 } }
  ]);
  // normalize months 1..12
  const result = Array.from({ length: 12 }, (_, i) => {
    const found = monthly.find(m => m._id === i+1);
    return {
      month: i+1,
      count: found ? found.count : 0,
      avgScore: found && found.avgScore ? Math.round(found.avgScore*100)/100 : 0
    };
  });
  res.json({ year, monthly: result });
});
