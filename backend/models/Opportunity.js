const mongoose = require('mongoose');

const OpportunitySchema = new mongoose.Schema({
    title: { type: String, required: true },
    companyOrFaculty: { type: String, required: true },
    type: { type: String, enum: ['Internship', 'Project'], required: true },
    description: { type: String, required: true },
    skillsRequired: [String],
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Opportunity', OpportunitySchema);