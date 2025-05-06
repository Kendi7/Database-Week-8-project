
-- Create Database
CREATE DATABASE IF NOT EXISTS Judiciary;
USE Judiciary;

-- Table: judges
CREATE TABLE IF NOT EXISTS judges (
  judge_id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  court VARCHAR(255)
);

-- Table: cases
CREATE TABLE IF NOT EXISTS cases (
  case_id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(255),
  judge_id INT,
  FOREIGN KEY (judge_id) REFERENCES judges(judge_id)
);

-- Table: hearings
CREATE TABLE IF NOT EXISTS hearings (
  hearing_id INT AUTO_INCREMENT PRIMARY KEY,
  case_id INT,
  hearing_date DATE,
  FOREIGN KEY (case_id) REFERENCES cases(case_id)
);

-- Insert Data into judges
INSERT INTO judges (name, court) VALUES 
('Justice Wanjiku Mwangi', 'High Court of Nairobi'),
('Justice David Omondi', 'Kisumu Law Courts'),
('Justice Grace Muthoni', 'Mombasa High Court'),
('Justice Peter Kiptoo', 'Eldoret High Court');

-- Insert Data into cases
INSERT INTO cases (title, judge_id) VALUES 
('Republic vs John Kariuki', 1),
('Miriam Otieno vs County Government', 2),
('State vs Brian Mwangi', 3),
('Elizabeth Auma vs National Bank', 4);

-- Insert Data into hearings
INSERT INTO hearings (case_id, hearing_date) VALUES 
(1, '2025-05-05'),
(2, '2025-05-10'),
(3, '2025-05-15'),
(4, '2025-05-20');

