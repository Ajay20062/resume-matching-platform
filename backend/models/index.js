const sequelize = require('./../db');
const { Sequelize } = require('sequelize');

// Import models
const Candidate = require('./Candidate')(sequelize, Sequelize.DataTypes);
const Job = require('./Job')(sequelize, Sequelize.DataTypes);

// Define associations if any
// Candidate.associate = (models) => {
//   // Define associations here
// };
// Job.associate = (models) => {
//   // Define associations here
// };

// Export models and sequelize
module.exports = {
  sequelize,
  Sequelize,
  Candidate,
  Job,
};
