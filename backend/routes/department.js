const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all departments
router.get('/', (req, res) => {
  db.query('SELECT * FROM department', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET department by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM department WHERE Dept_no = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new department
router.post('/', (req, res) => {
  const { Dept_no, Dept_name, Address } = req.body;
  db.query('INSERT INTO department (Dept_no, Dept_name, Address) VALUES (?, ?, ?)', 
    [Dept_no, Dept_name, Address], 
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: 'Department created', id: result.insertId });
    });
});

module.exports = router;
