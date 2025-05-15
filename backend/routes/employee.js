const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all employee
router.get('/', (req, res) => {
  db.query('SELECT * FROM employee', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET employee by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM employee WHERE id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new employee
router.post('/', (req, res) => {
  const data = req.body;
  db.query('INSERT INTO employee SET ?', data, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Employee created', id: result.insertId });
  });
});

module.exports = router;
