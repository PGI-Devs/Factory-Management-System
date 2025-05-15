const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all vendors
router.get('/', (req, res) => {
  db.query('SELECT * FROM vendors', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET vendor by ID
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM vendors WHERE vendor_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new vendor
router.post('/', (req, res) => {
  const { vendor_id, name, contact_info, gst_number, registration_date, rating } = req.body;
  const sql = `INSERT INTO vendors (vendor_id, name, contact_info, gst_number, registration_date, rating)
               VALUES (?, ?, ?, ?, ?, ?)`;
  db.query(sql, [vendor_id, name, contact_info, gst_number, registration_date, rating], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Vendor created', id: result.insertId });
  });
});

// PUT update vendor
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE vendors SET ${fields} WHERE vendor_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Vendor updated' });
  });
});

// DELETE vendor
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM vendors WHERE vendor_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Vendor deleted' });
  });
});

module.exports = router;
