const Candidate = require("../models/Candidate");
const parseResume = require("../services/resumeParser");


exports.uploadResume = async (req, res) => {
try {
const parsed = await parseResume(req.file.path);
await Candidate.create(parsed);
res.json({ message: "Resume uploaded and stored in SQL DB" });
} catch (err) {
res.status(500).json({ error: err.message });
}
};