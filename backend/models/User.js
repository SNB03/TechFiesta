const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['student', 'faculty'], default: 'student' },
  
  // Location & College (for Faculty)
  state: String,
  district: String,
  collegeName: String,
  collegeCode: String,

  // Security & Verification
  verificationDoc: { type: String }, // Path to uploaded file
  isVerified: { type: Boolean, default: false }, // False until OTP is entered
  otp: String,
  otpExpires: Date,

  // Student specific
  skills: [String],
  resumeLink: String
});

module.exports = mongoose.model('User', UserSchema);