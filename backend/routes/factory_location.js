const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all factory locations
router.get('/', (req, res) => {
  db.query('SELECT * FROM factory_location', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET factory location by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM factory_location WHERE factory_location_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new factory location
router.post('/', (req, res) => {
  const { factory_location_id, area_name, floor_number, manager_name, contact_number } = req.body;
  const sql = `INSERT INTO factory_location (factory_location_id, area_name, floor_number, manager_name, contact_number)
               VALUES (?, ?, ?, ?, ?)`;
  db.query(sql, [factory_location_id, area_name, floor_number, manager_name, contact_number], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Factory location created', id: result.insertId });
  });
});

// PUT update factory location
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE factory_location SET ${fields} WHERE factory_location_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Factory location updated' });
  });
});

// DELETE factory location
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM factory_location WHERE factory_location_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Factory location deleted' });
  });
});

module.exports = router;
