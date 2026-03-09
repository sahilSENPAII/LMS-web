const express = require("express");
const router = express.Router();
const pool = require("../config/db");

// ====================================
// CREATE PAYMENT + ENROLL USER
// ====================================
router.post("/", async (req, res) => {

  try {

    const { user_id, course_id, amount } = req.body;

    if (!user_id || !course_id) {
      return res.status(400).json({
        error: "user_id and course_id required"
      });
    }

    // check if already enrolled
    const existing = await pool.query(
      "SELECT * FROM enrollments WHERE user_id=$1 AND course_id=$2",
      [user_id, course_id]
    );

    if (existing.rows.length > 0) {
      return res.status(400).json({
        error: "User already enrolled in this course"
      });
    }

    // save payment
    const payment = await pool.query(
      `
      INSERT INTO payments (user_id, course_id, amount, status)
      VALUES ($1,$2,$3,'completed')
      RETURNING *
      `,
      [user_id, course_id, amount]
    );

    // create enrollment automatically
    await pool.query(
      `
      INSERT INTO enrollments (user_id, course_id)
      VALUES ($1,$2)
      `,
      [user_id, course_id]
    );

    res.json({
      message: "Payment successful and enrollment created",
      payment: payment.rows[0]
    });

  } catch (err) {

    console.error(err);
    res.status(500).json({
      error: "Payment failed"
    });

  }

});

// ====================================
// GET ALL PAYMENTS (ADMIN)
// ====================================
router.get("/", async (req, res) => {

  try {

    const result = await pool.query(`
      SELECT 
        p.id,
        u.name as user_name,
        c.title as course_title,
        p.amount,
        p.status,
        p.paid_at
      FROM payments p
      JOIN users u ON p.user_id = u.id
      JOIN courses c ON p.course_id = c.id
      ORDER BY p.paid_at DESC
    `);

    res.json(result.rows);

  } catch (err) {

    console.error(err);
    res.status(500).json({
      error: "Failed to fetch payments"
    });

  }

});

module.exports = router;