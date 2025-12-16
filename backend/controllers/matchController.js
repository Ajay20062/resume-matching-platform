const Candidate = require("../models/Candidate");
const Job = require("../models/Job");
const matchCandidate = require("../services/matcher");
const { matchWithAI } = require("../services/aiParser");


exports.matchCandidates = async (req, res) => {
try {
const job = await Job.findByPk(req.params.jobId);
const candidates = await Candidate.findAll();

const results = await Promise.all(candidates.map(async (c) => {
const basicScore = matchCandidate(c, job);
let aiScore = 0;
try {
aiScore = await matchWithAI(c, job);
} catch (aiError) {
console.log('AI matching failed for candidate:', c.name, aiError.message);
}

// Combine basic and AI scores (weighted average)
const combinedScore = (basicScore * 0.4) + (aiScore * 0.6);

return {
candidate: c.name || "Candidate",
matchScore: combinedScore,
skills: c.skills,
experience: c.experience
};
}));

res.json(results.sort((a, b) => b.matchScore - a.matchScore));
} catch (err) {
res.status(500).json({ error: err.message });
}
};
