const express = require("express");
const { createJob, getJobs } = require("../controllers/jobController");
// const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
router.post("/", createJob); // authenticateToken,
router.get("/", getJobs); // authenticateToken,

module.exports = router;
