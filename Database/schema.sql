CREATE DATABASE resume_db;
USE resume_db;


CREATE TABLE candidates (
id INT AUTO_INCREMENT PRIMARY KEY,
name VARCHAR(100),
skills TEXT
);


CREATE TABLE jobs (
id INT AUTO_INCREMENT PRIMARY KEY,
title VARCHAR(100),
required_skills TEXT,
min_experience INT
);
