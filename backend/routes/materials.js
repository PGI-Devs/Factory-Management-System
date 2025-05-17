const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all materials
router.get('/', (req, res) => {
  db.query('SELECT * FROM materials', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET material by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM materials WHERE material_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new material
router.post('/', (req, res) => {
  const { material_id, name, category_id, variant_id, uom, condition_id, location_id } = req.body;
  const sql = `INSERT INTO materials (material_id, name, category_id, variant_id, uom, condition_id, location_id)
               VALUES (?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [material_id, name, category_id, variant_id, uom, condition_id, location_id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Material created', id: result.insertId });
  });
});

// PUT update material
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE materials SET ${fields} WHERE material_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Material updated' });
  });
});

// DELETE material
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM materials WHERE material_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Material deleted' });
  });
});

module.exports = router;
