const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const nodemailer = require('nodemailer');
const path = require('path');
const fs = require('fs');

// --- 1. SETUP MULTER (File Upload) ---
// Ensure 'uploads' directory exists
const uploadDir = 'uploads';
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir);

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, 'uploads/'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// --- 2. SETUP NODEMAILER (Email Sending) ---
const transporter = nodemailer.createTransport({
  service: 'gmail', // Use 'gmail' or your SMTP provider
  auth: {
    user: 'your-email@gmail.com', // ⚠️ REPLACE THIS
    pass: 'your-app-password'      // ⚠️ REPLACE THIS (Not your login password, generate an App Password)
  }
});

// Helper: Generate 6-digit OTP
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Helper: Generate College Code
const generateCollegeCode = (state) => {
  const prefix = state ? state.substring(0, 2).toUpperCase() : 'XX';
  return `${prefix}-${Math.floor(1000 + Math.random() * 9000)}`;
};

// --- ROUTE A: REGISTER (Step 1: Upload & Send OTP) ---
router.post('/register', upload.single('verificationDoc'), async (req, res) => {
  try {
    const { name, email, password, role, state, district, collegeName } = req.body;
    
    // Check if user exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ msg: 'User already exists' });

    // Generate Security Data
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const otp = generateOTP();
    let collegeCode = role === 'faculty' ? generateCollegeCode(state) : null;
    let docPath = req.file ? req.file.path : null;

    // Create User (isVerified = false)
    user = new User({
      name, email, password: hashedPassword, role,
      state, district, collegeName, collegeCode,
      verificationDoc: docPath,
      otp, 
      otpExpires: Date.now() + 10 * 60 * 1000, // 10 Minutes expiry
      isVerified: false
    });

    await user.save();

    // Send OTP Email
    const mailOptions = {
      from: 'CampusConnect Security',
      to: email,
      subject: 'Verify your CampusConnect Account',
      text: `Your OTP for registration is: ${otp}. It expires in 10 minutes.`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Email Error:', error);
        return res.status(500).json({ msg: 'Error sending OTP' });
      } else {
        res.status(200).json({ msg: 'OTP sent to email', userId: user._id });
      }
    });

  } catch (err) {
    console.error(err);
    res.status(500).send('Server Error');
  }
});

// --- ROUTE B: VERIFY OTP (Step 2: Activate Account) ---
router.post('/verify-otp', async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) return res.status(400).json({ msg: 'User not found' });

    // Validate OTP
    if (user.otp !== otp || user.otpExpires < Date.now()) {
      return res.status(400).json({ msg: 'Invalid or Expired OTP' });
    }

    // Activate User
    user.isVerified = true;
    user.otp = undefined;
    user.otpExpires = undefined;
    await user.save();

    // Generate Token
    const payload = { user: { id: user.id, role: user.role, collegeCode: user.collegeCode } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, collegeCode: user.collegeCode });
    });

  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;