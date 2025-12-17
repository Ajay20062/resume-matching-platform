const Job = require("../models/Job");

exports.createJob = async (req, res) => {
  try {
    const { title, skills, description, location, salary } = req.body;
    const jobData = {
      title,
      required_skills: Array.isArray(skills) ? skills.join(',') : skills,
      description,
      location,
      salary: parseFloat(salary) || null
    };
    try {
      const job = await Job.create(jobData);
      res.json({ message: "Job created successfully", job });
    } catch (dbErr) {
      console.error('Database error:', dbErr.message);
      res.json({ message: "Job data processed successfully, but database storage failed. Job data: " + JSON.stringify(jobData) });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.findAll();
    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
