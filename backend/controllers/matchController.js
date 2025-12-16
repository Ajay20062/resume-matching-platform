const Candidate = require("../models/Candidate");
const Job = require("../models/Job");
const matchCandidate = require("../services/matcher");


exports.matchCandidates = async (req, res) => {
try {
const job = await Job.findByPk(req.params.jobId);
const candidates = await Candidate.findAll();


const results = candidates.map(c => ({
candidate: c.name || "Candidate",
matchScore: matchCandidate(c, job)
}));


res.json(results.sort((a, b) => b.matchScore - a.matchScore));
} catch (err) {
res.status(500).json({ error: err.message });
}
};