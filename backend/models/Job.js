const { DataTypes } = require("sequelize");
const sequelize = require("./index");


const Job = sequelize.define("Job", {
title: DataTypes.STRING,
skills: DataTypes.TEXT,
minExperience: DataTypes.INTEGER
});


module.exports = Job;