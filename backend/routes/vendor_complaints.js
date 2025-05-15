const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all vendor complaints
router.get('/', (req, res) => {
  db.query('SELECT * FROM vendor_complaints', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET vendor complaint by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM vendor_complaints WHERE complaint_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new vendor complaint
router.post('/', (req, res) => {
  const { complaint_id, vendor_id, complaint_date, description, status } = req.body;
  const sql = `INSERT INTO vendor_complaints (complaint_id, vendor_id, complaint_date, description, status)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [complaint_id, vendor_id, complaint_date, description, status], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Vendor complaint created', id: result.insertId });
  });
});

// PUT update vendor complaint
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE vendor_complaints SET ${fields} WHERE complaint_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Vendor complaint updated' });
  });
});

// DELETE vendor complaint
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM vendor_complaints WHERE complaint_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Vendor complaint deleted' });
  });
});

module.exports = router;
