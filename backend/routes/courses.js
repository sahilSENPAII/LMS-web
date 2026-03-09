const express = require("express");
const router = express.Router();
const pool = require('../config/db');

// ==============================
// GET ALL COURSES
// ==============================
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM courses ORDER BY id DESC"
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Server error fetching courses" });
  }
});


// ==============================
// GET SINGLE COURSE (View Details)
// ==============================
router.get("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "SELECT * FROM courses WHERE id = $1",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error fetching course:", err);
    res.status(500).json({ error: "Server error fetching course" });
  }
});


// ==============================
// CREATE COURSE (Admin)
// ==============================
router.post("/", async (req, res) => {
  const { title, description, price } = req.body;

  if (!title || !description || !price) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      `INSERT INTO courses (title, description, price)
       VALUES ($1, $2, $3)
       RETURNING *`,
      [title, description, price]
    );

    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error creating course:", err);
    res.status(500).json({ error: "Server error creating course" });
  }
});


// ==============================
// UPDATE COURSE
// ==============================
router.put("/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, price } = req.body;

  try {
    const result = await pool.query(
      `UPDATE courses
       SET title = $1,
           description = $2,
           price = $3
       WHERE id = $4
       RETURNING *`,
      [title, description, price, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating course:", err);
    res.status(500).json({ error: "Server error updating course" });
  }
});


// ==============================
// DELETE COURSE
// ==============================
router.delete("/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM courses WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Course not found" });
    }

    res.json({ message: "Course deleted successfully" });
  } catch (err) {
    console.error("Error deleting course:", err);
    res.status(500).json({ error: "Server error deleting course" });
  }
});

module.exports = router;