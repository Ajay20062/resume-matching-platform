const { DataTypes } = require("sequelize");
const sequelize = require("./index");


const Candidate = sequelize.define("Candidate", {
name: DataTypes.STRING,
email: DataTypes.STRING,
phone: DataTypes.STRING,
skills: DataTypes.TEXT,
experience: DataTypes.INTEGER,
education: DataTypes.STRING,
resumeText: DataTypes.TEXT
});


module.exports = Candidate;