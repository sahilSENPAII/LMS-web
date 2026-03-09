const express = require('express');
const router = express.Router();
const pool = require('../config/db'); // PostgreSQL connection

// GET all users
// GET all users
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users');
    res.json(result.rows); // <-- semicolon and remove stray text
  } catch (err) {
    console.error('Database GET error:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// POST new user
router.post('/', async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate request body
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required: name, email, password, role' });
  }

  try {
    const result = await pool.query(
      'INSERT INTO users (name, email, password, role, created_at) VALUES ($1, $2, $3, $4, NOW()) RETURNING *',
      [name, email, password, role]
    );
    res.status(201).json(result.rows[0]); // Return the newly created user
  } catch (err) {
    console.error('FULL ERROR:', err);   // Logs PostgreSQL full error
    res.status(500).json({ error: err.message }); // Sends real error back to Postman
}
});

module.exports = router;