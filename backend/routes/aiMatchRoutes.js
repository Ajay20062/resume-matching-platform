const express = require('express');
const { aiMatchCandidates } = require('../controllers/aiMatchController');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();

router.get('/job/:jobId', authenticateToken, aiMatchCandidates);

module.exports = router;
