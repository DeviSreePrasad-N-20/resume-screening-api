const express = require('express');
const router = express.Router();
const { summary, monthly } = require('../controllers/reportsController');
const { protect, } = require('../middlewares/auth');

router.get('/summary', protect, summary);
router.get('/monthly', protect, monthly);

module.exports = router;
