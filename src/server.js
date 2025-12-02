require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const candidateRoutes = require('./routes/candidates');
const uploadRoutes = require('./routes/upload');
const screeningRoutes = require('./routes/screening');
const reportsRoutes = require('./routes/reports');

connectDB();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/candidates', candidateRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/screening', screeningRoutes);
app.use('/api/reports', reportsRoutes);

// error handler
app.use((err, req, res, next) => {
  console.error(err);
  res.status(res.statusCode || 500).json({ message: err.message || 'Server error' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
