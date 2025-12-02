const express = require('express');
const router = express.Router();
const {
  createCandidate, getCandidates, getCandidate, updateCandidate, deleteCandidate, uploadCandidateResume
} = require('../controllers/candidateController');
const { protect } = require('../middlewares/auth');

router.post('/', protect, createCandidate);
router.get('/', protect, getCandidates);
router.get('/:id', protect, getCandidate);
router.put('/:id', protect, updateCandidate);
router.delete('/:id', protect, deleteCandidate);
router.post('/:id/resume', protect, uploadCandidateResume);

module.exports = router;
