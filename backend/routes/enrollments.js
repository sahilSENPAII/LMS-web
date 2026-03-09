const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ===============================
// Create Enrollment
// ===============================
router.post("/", async (req, res) => {
  try {
    const { user_id, course_id } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({ error: "user_id and course_id required" });
    }

    // Check if already enrolled
    const existing = await pool.query(
      "SELECT * FROM enrollments WHERE user_id=$1 AND course_id=$2",
      [user_id, course_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({ error: "User already enrolled in this course" });
    }

    const result = await pool.query(
      `
      INSERT INTO enrollments (user_id, course_id)
      VALUES ($1,$2)
      RETURNING *
      `,
      [user_id, course_id]
    );

    res.json(result.rows[0]);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Enrollment failed" });
  }
});

// ===============================
// Get All Enrollments
// ===============================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        e.id,
        u.name AS user_name,
        c.title AS course_title,
        e.created_at
      FROM enrollments e
      JOIN users u ON e.user_id = u.id
      JOIN courses c ON e.course_id = c.id
      ORDER BY e.created_at DESC
    `);

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});

// ===============================
// Get Courses for Specific User
// ===============================
router.get("/user/:user_id", async (req, res) => {
  try {
    const { user_id } = req.params;

    const result = await pool.query(
      `
      SELECT c.*
      FROM enrollments e
      JOIN courses c ON e.course_id = c.id
      WHERE e.user_id = $1
      `,
      [user_id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch user courses" });
  }
});

module.exports = router;