const express = require("express");
const cors = require("cors");
require("dotenv").config();


const sequelize = require("./models/index");
const resumeRoutes = require("./routes/resumeRoutes");
const jobRoutes = require("./routes/jobRoutes");
const matchRoutes = require("./routes/matchRoutes");


const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));


sequelize.sync();


app.use("/api/resume", resumeRoutes);
app.use("/api/job", jobRoutes);
app.use("/api/match", matchRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));