const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all purchases
router.get('/', (req, res) => {
  db.query('SELECT * FROM purchases', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET purchase by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM purchases WHERE purchase_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new purchase
router.post('/', (req, res) => {
  const { purchase_id, vendor_id, material_id, purchase_date, quantity, cost, payment_status, invoice_number } = req.body;
  const sql = `INSERT INTO purchases (purchase_id, vendor_id, material_id, purchase_date, quantity, cost, payment_status, invoice_number)
               VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
  db.query(sql, [purchase_id, vendor_id, material_id, purchase_date, quantity, cost, payment_status, invoice_number], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Purchase created', id: result.insertId });
  });
});

// PUT update purchase
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE purchases SET ${fields} WHERE purchase_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Purchase updated' });
  });
});

// DELETE purchase
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM purchases WHERE purchase_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Purchase deleted' });
  });
});

module.exports = router;
