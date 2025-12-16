const express = require("express");
const { matchCandidates } = require("../controllers/matchController");


const router = express.Router();
router.get("/:jobId", matchCandidates);


module.exports = router;