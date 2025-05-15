const express = require('express');
const router = express.Router();
const db = require('../db');

// GET all categories
router.get('/', (req, res) => {
  db.query('SELECT * FROM categories', (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
});

// GET category by id
router.get('/:id', (req, res) => {
  db.query('SELECT * FROM categories WHERE category_id = ?', [req.params.id], (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results[0]);
  });
});

// POST create new category
router.post('/', (req, res) => {
  const { category_id, category_name, description } = req.body;
  const sql = `INSERT INTO categories (category_id, category_name, description) VALUES (?, ?, ?)`;
  db.query(sql, [category_id, category_name, description], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.status(201).json({ message: 'Category created', id: result.insertId });
  });
});

// PUT update category
router.put('/:id', (req, res) => {
  const updatedFields = req.body;
  const fields = Object.keys(updatedFields).map(key => `${key} = ?`).join(', ');
  const values = Object.values(updatedFields);
  const sql = `UPDATE categories SET ${fields} WHERE category_id = ?`;

  db.query(sql, [...values, req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Category updated' });
  });
});

// DELETE category
router.delete('/:id', (req, res) => {
  db.query('DELETE FROM categories WHERE category_id = ?', [req.params.id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Category deleted' });
  });
});

module.exports = router;
