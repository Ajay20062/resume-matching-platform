const express = require("express");
const cors = require("cors");
require("dotenv").config();


const { sequelize } = require("./models/index");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const matchRoutes = require("./routes/matchRoutes");
const authRoutes = require("./routes/authRoutes");



const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


sequelize.sync().catch(err => {
  console.error('Database sync failed:', err.message);
  console.log('Continuing without database sync...');
});


app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/match", matchRoutes);
// app.use("/api/ai", aiRoutes); // Commented out as aiRoutes is not defined


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
