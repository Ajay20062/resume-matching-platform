const Candidate = require("../models/Candidate");
const parseResume = require("../services/resumeParser");


exports.uploadResume = async (req, res) => {
if (!req.file) {
return res.status(400).json({ error: "No file uploaded" });
}
try {
const parsed = await parseResume(req.file.path);
parsed.skills = JSON.stringify(parsed.skills);
try {
await Candidate.create(parsed);
res.json({ message: "Resume uploaded and stored in SQL DB" });
} catch (dbErr) {
console.error('Database error:', dbErr.message);
res.json({ message: "Resume parsed successfully, but database storage failed. Parsed data: " + JSON.stringify(parsed) });
}
} catch (err) {
res.status(500).json({ error: err.message });
}
};
