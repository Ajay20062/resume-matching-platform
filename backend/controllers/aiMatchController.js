const Candidate = require("../models/Candidate");
const Job = require("../models/Job");
const { matchWithAI } = require("../services/aiParser");

exports.aiMatchCandidates = async (req, res) => {
  try {
    const job = await Job.findByPk(req.params.jobId);
    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const candidates = await Candidate.findAll();

    const results = await Promise.all(candidates.map(async (c) => {
      try {
        const aiScore = await matchWithAI(c, job);
        return {
          candidate: c.name || "Candidate",
          matchScore: aiScore,
          skills: c.skills,
          experience: c.experience
        };
      } catch (aiError) {
        console.log('AI matching failed for candidate:', c.name, aiError.message);
        return {
          candidate: c.name || "Candidate",
          matchScore: 0,
          skills: c.skills,
          experience: c.experience,
          error: aiError.message
        };
      }
    }));

    res.json(results.sort((a, b) => b.matchScore - a.matchScore));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
