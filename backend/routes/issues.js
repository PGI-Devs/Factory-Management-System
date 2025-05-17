const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all issues
router.get('/', (req, res) => {
  db.query('SELECT * FROM issues', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET issue by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM issues WHERE issue_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new issue
router.post('/', (req, res) => {
  const { issue_id, material_id, job_id, quantity_issued, issue_date } = req.body;
  const sql = `INSERT INTO issues (issue_id, material_id, job_id, quantity_issued, issue_date)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [issue_id, material_id, job_id, quantity_issued, issue_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Issue created', id: result.insertId });
  });
});

// PUT update issue
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE issues SET ${fields} WHERE issue_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Issue updated' });
  });
});

// DELETE issue
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM issues WHERE issue_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Issue deleted' });
  });
});

module.exports = router;
