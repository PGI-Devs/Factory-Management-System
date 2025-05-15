const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all locations
router.get('/', (req, res) => {
  db.query('SELECT * FROM location', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET location by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM location WHERE location_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new location
router.post('/', (req, res) => {
  const { location_id, factory_location_id, location_name, description } = req.body;
  const sql = `INSERT INTO location (location_id, factory_location_id, location_name, description)
               VALUES (?, ?, ?, ?)`;
  db.query(sql, [location_id, factory_location_id, location_name, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Location created', id: result.insertId });
  });
});

// PUT update location
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE location SET ${fields} WHERE location_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Location updated' });
  });
});

// DELETE location
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM location WHERE location_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Location deleted' });
  });
});

module.exports = router;
