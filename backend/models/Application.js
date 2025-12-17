const mongoose = require('mongoose');

const ApplicationSchema = new mongoose.Schema({
  jobId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Opportunity', 
    required: true 
  },
  studentId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  studentName: String,
  studentEmail: String,
  studentBranch: String,
  studentCGPA: String,
  resumeLink: String, // Optional URL to resume
  status: { 
    type: String, 
    enum: ['Pending', 'Shortlisted', 'Rejected', 'Accepted'], 
    default: 'Pending' 
  },
  appliedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Application', ApplicationSchema);