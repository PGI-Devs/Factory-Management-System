const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all stock entries
router.get('/', (req, res) => {
  db.query('SELECT * FROM stock', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET stock by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM stock WHERE stock_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new stock entry
router.post('/', (req, res) => {
  const { stock_id, material_id, quantity_available } = req.body;
  const sql = `INSERT INTO stock (stock_id, material_id, quantity_available) VALUES (?, ?, ?)`;
  db.query(sql, [stock_id, material_id, quantity_available], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Stock entry created', id: result.insertId });
  });
});

// PUT update stock entry
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE stock SET ${fields} WHERE stock_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Stock entry updated' });
  });
});

// DELETE stock entry
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM stock WHERE stock_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Stock entry deleted' });
  });
});

module.exports = router;
