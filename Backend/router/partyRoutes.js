// routes/partyRoutes.js

const express = require('express');
const router = express.Router();
const partyController = require('../controllers/partyController');

router.post('/party', partyController.addParty);

module.exports = router;
