// const mongoose = require('mongoose');

// const UserSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   password: { type: String, required: true },
//   role: { 
//     type: String, 
//     enum: ['student', 'faculty', 'owner'], 
//     default: 'student' 
//   },
  
//   // Faculty Details
//   state: { type: String, default: '' },
//   district: { type: String, default: '' },
//   taluka: { type: String, default: '' }, // ✅ Added Taluka
//   collegeName: { type: String, default: '' },
  
//   // Unique Admin ID
//   collegeCode: { type: String, sparse: true }, 

//   // Security
//   verificationDoc: { type: String, default: '' },
//   isVerified: { type: Boolean, default: false },
//   otp: String,
//   otpExpires: Date,

//   // Student Details
//   skills: [String],
//   resumeLink: String
// }, { timestamps: true });

// module.exports = mongoose.model('User', UserSchema);


const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { 
    type: String, 
    enum: ['student', 'faculty', 'owner'], 
    default: 'student' 
  },
  
  // Faculty Details
  state: { type: String, default: '' },
  district: { type: String, default: '' },
  taluka: { type: String, default: '' },
  collegeName: { type: String, default: '' },
  
  // The Code: Generated for Faculty, Entered by Students
  collegeCode: { type: String, sparse: true }, 

  // Student Details (New Fields)
  branch: { type: String, default: '' },
  year: { type: String, default: '' },
  cgpa: { type: String, default: '' },
  
  // Security
  verificationDoc: { type: String, default: '' },
  isVerified: { type: Boolean, default: false },
  otp: String,
  otpExpires: Date,
}, { timestamps: true });

module.exports = mongoose.model('User', UserSchema);