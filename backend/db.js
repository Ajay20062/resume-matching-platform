const { Sequelize } = require('sequelize');

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

module.exports = sequelize;
