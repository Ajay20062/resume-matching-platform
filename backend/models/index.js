const { Sequelize } = require('sequelize');
const path = require('path');

// Initialize Sequelize
const sequelize = new Sequelize({
  dialect: 'mysql',
  host: process.env.DB_HOST || 'localhost',
  port: process.env.DB_PORT || 3306,
  database: process.env.DB_NAME || 'resume_db',
  username: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Killer@123',
  logging: console.log,
});

// Test connection
sequelize.authenticate()
  .then(() => console.log('Database connected successfully'))
  .catch(err => {
    console.error('Database connection failed:', err.message);
    console.log('Continuing without database connection...');
  });

// Import models
const Candidate = require('./Candidate')(sequelize, Sequelize.DataTypes);

// Define associations if any
// Candidate.associate = (models) => {
//   // Define associations here
// };

// Export models and sequelize
module.exports = {
  sequelize,
  Sequelize,
  Candidate,
};
