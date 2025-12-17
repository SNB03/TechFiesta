const express = require('express');
const router = express.Router();
const auth = require('../middleware/authMiddleware');
const Opportunity = require('../models/Opportunity');

// GET all posts
router.get('/', auth, async (req, res) => {
    try {
        const opps = await Opportunity.find().sort({ createdAt: -1 });
        res.json(opps);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// POST a new opportunity (Only for Faculty/Companies)
router.post('/', auth, async (req, res) => {
    try {
        const { title, type, description, skillsRequired, companyOrFaculty } = req.body;
        
        const newOpp = new Opportunity({
            title,
            type,
            description,
            skillsRequired: skillsRequired.split(',').map(skill => skill.trim()),
            companyOrFaculty,
            postedBy: req.user.id
        });

        const opportunity = await newOpp.save();
        res.json(opportunity);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;