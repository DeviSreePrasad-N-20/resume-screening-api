const mongoose = require('mongoose');

const candidateSchema = new mongoose.Schema({
  name: { type: String, required: true, index: true },
  email: { type: String, required: true, unique: true, index: true },
  phone: { type: String },
  skills: [{ type: String, index: true }],
  experienceYears: { type: Number, default: 0 },
  resume: {
    url: { type: String },
    public_id: { type: String } // cloudinary id
  },
  score: { type: Number, default: 0 },
  status: { type: String, enum: ['applied','screened','shortlisted','interviewed','rejected','hired'], default: 'applied', index: true },
  metadata: { type: mongoose.Schema.Types.Mixed }
}, { timestamps: true });

// create a text index for simple text searching across name, email, skills
candidateSchema.index({ name: 'text', email: 'text', skills: 'text' });

module.exports = mongoose.model('Candidate', candidateSchema);
