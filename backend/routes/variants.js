const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all variants
router.get('/', (req, res) => {
  db.query('SELECT * FROM variants', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET variant by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM variants WHERE variant_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new variant
router.post('/', (req, res) => {
  const { variant_id, category_id, variant_name } = req.body;
  const sql = `INSERT INTO variants (variant_id, category_id, variant_name) VALUES (?, ?, ?)`;
  db.query(sql, [variant_id, category_id, variant_name], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Variant created', id: result.insertId });
  });
});

// PUT update variant
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE variants SET ${fields} WHERE variant_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Variant updated' });
  });
});

// DELETE variant
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM variants WHERE variant_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Variant deleted' });
  });
});

module.exports = router;
