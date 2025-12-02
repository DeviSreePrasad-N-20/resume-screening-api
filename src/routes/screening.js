const express = require('express');
const router = express.Router();
const { scoreCandidate, getShortlist } = require('../controllers/screeningController');
const { protect } = require('../middlewares/auth');

router.post('/:candidateId/score', protect, scoreCandidate);
router.get('/shortlist', protect, getShortlist);

module.exports = router;
