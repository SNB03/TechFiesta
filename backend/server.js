
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // Import path
require('dotenv').config();

const app = express();

app.use(express.json());
app.use(cors());

// Serve the 'uploads' folder statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// ... (Rest of your DB connection and routes)
app.use('/api/auth', require('./routes/auth'));
app.use('/api/opportunities', require('./routes/opportunities'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));