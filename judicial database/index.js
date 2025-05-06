
// index.js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
app.use(bodyParser.json());

// Database connection
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'Judiciary'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to MySQL database.');
});


// CRUD: Table Judges

app.post('/judges', (req, res) => {
  const { name, court } = req.body;
  const query = 'INSERT INTO judges (name, court) VALUES (?, ?)';
  db.query(query, [name, court], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Judge created', judge_id: result.insertId });
  });
});

app.get('/judges', (req, res) => {
  db.query('SELECT * FROM judges', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/judges/:id', (req, res) => {
  const { name, court } = req.body;
  db.query('UPDATE judges SET name = ?, court = ? WHERE judge_id = ?', [name, court, req.params.id], err => {
    if (err) throw err;
    res.json({ message: 'Judge updated' });
  });
});

app.delete('/judges/:id', (req, res) => {
  db.query('DELETE FROM judges WHERE judge_id = ?', [req.params.id], err => {
    if (err) throw err;
    res.json({ message: 'Judge deleted' });
  });
});


// CRUD: Table Cases

app.post('/cases', (req, res) => {
  const { title, judge_id } = req.body;
  db.query('INSERT INTO cases (title, judge_id) VALUES (?, ?)', [title, judge_id], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Case created', case_id: result.insertId });
  });
});

app.get('/cases', (req, res) => {
  db.query('SELECT * FROM cases', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/cases/:id', (req, res) => {
  const { title, judge_id } = req.body;
  db.query('UPDATE cases SET title = ?, judge_id = ? WHERE case_id = ?', [title, judge_id, req.params.id], err => {
    if (err) throw err;
    res.json({ message: 'Case updated' });
  });
});

app.delete('/cases/:id', (req, res) => {
  db.query('DELETE FROM cases WHERE case_id = ?', [req.params.id], err => {
    if (err) throw err;
    res.json({ message: 'Case deleted' });
  });
});


// CRUD: Table Hearings

app.post('/hearings', (req, res) => {
  const { case_id, hearing_date } = req.body;
  db.query('INSERT INTO hearings (case_id, hearing_date) VALUES (?, ?)', [case_id, hearing_date], (err, result) => {
    if (err) throw err;
    res.status(201).json({ message: 'Hearing created', hearing_id: result.insertId });
  });
});

app.get('/hearings', (req, res) => {
  db.query('SELECT * FROM hearings', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.put('/hearings/:id', (req, res) => {
  const { case_id, hearing_date } = req.body;
  db.query('UPDATE hearings SET case_id = ?, hearing_date = ? WHERE hearing_id = ?', [case_id, hearing_date, req.params.id], err => {
    if (err) throw err;
    res.json({ message: 'Hearing updated' });
  });
});

app.delete('/hearings/:id', (req, res) => {
  db.query('DELETE FROM hearings WHERE hearing_id = ?', [req.params.id], err => {
    if (err) throw err;
    res.json({ message: 'Hearing deleted' });
  });
});

// Start Server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
