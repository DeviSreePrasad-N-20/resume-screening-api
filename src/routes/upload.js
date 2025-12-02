const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'tmp/' }); // quick setup, clean tmp in production
const { uploadResume } = require('../controllers/uploadController');
const { protect, } = require('../middlewares/auth');

router.post('/resume', protect, upload.single('resume'), uploadResume);

module.exports = router;
