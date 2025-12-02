const asyncHandler = require('express-async-handler');
const cloudinary = require('../config/cloudinary');

exports.uploadResume = asyncHandler(async (req, res) => {
  // multer will attach file buffer or path depending on setup; here we used multer-storage-cloudinary or upload via temp file
  if (!req.file) {
    res.status(400);
    throw new Error('No file uploaded');
  }

  // If using multer-storage-cloudinary, req.file will already have a path and public_id
  const { path, filename } = req.file;
  // For simplicity: upload file path to cloudinary
  const result = await cloudinary.uploader.upload(path || req.file.path, {
    resource_type: 'auto',
    folder: 'resumes'
  });

  res.json({ url: result.secure_url, public_id: result.public_id });
});
