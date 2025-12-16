const Job = require("../models/Job");


exports.createJob = async (req, res) => {
try {
req.body.skills = req.body.skills.join(",");
await Job.create(req.body);
res.json({ message: "Job created successfully" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};