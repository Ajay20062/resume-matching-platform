CREATE DATABASE resume_db;
USE resume_db;

CREATE TABLE candidates (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  skills TEXT,
  experience INT,
  education TEXT
);

CREATE TABLE jobs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  required_skills TEXT,
  location VARCHAR(255),
  salary DECIMAL(10, 2)
);
