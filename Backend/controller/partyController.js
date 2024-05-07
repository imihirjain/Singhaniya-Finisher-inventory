// controllers/partyController.js

const Party = require('../models/Party');

exports.addParty = async (req, res) => {
  try {
    const { name, description } = req.body;
    const party = await Party.create({ name, description });
    res.json({ success: true, party });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
