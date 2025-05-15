const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all finished goods
router.get('/', (req, res) => {
  db.query('SELECT * FROM finished_goods', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET finished good by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM finished_goods WHERE finished_good_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new finished good
router.post('/', (req, res) => {
  const { finished_good_id, job_id, name, quantity, completion_date } = req.body;
  const sql = `INSERT INTO finished_goods (finished_good_id, job_id, name, quantity, completion_date)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [finished_good_id, job_id, name, quantity, completion_date], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Finished good created', id: result.insertId });
  });
});

// PUT update finished good
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE finished_goods SET ${fields} WHERE finished_good_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Finished good updated' });
  });
});

// DELETE finished good
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM finished_goods WHERE finished_good_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Finished good deleted' });
  });
});

module.exports = router;
