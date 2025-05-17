const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all jobs
router.get('/', (req, res) => {
  db.query('SELECT * FROM jobs', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET job by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM jobs WHERE job_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new job
router.post('/', (req, res) => {
  const { job_id, job_name, start_date, end_date, employee_id } = req.body;
  const sql = `INSERT INTO jobs (job_id, job_name, start_date, end_date, employee_id)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [job_id, job_name, start_date, end_date, employee_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Job created', id: result.insertId });
  });
});

// PUT update job
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE jobs SET ${fields} WHERE job_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Job updated' });
  });
});

// DELETE job
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM jobs WHERE job_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Job deleted' });
  });
});

module.exports = router;
