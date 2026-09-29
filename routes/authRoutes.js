const express = require("express");
const bcrypt = require("bcrypt");
const pool = require("../db/database");

const router = express.Router();

router.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email?.trim() || !password) {
    return res.status(400).json({
      message: "Enter your email and password."
    });
  }

  try {
    const [rows] = await pool.execute(
      `SELECT user_id, email, password_hash
       FROM users
       WHERE email = ?`,
      [email.trim()]
    );

    const user = rows[0];

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    const passwordMatches = await bcrypt.compare(
      password,
      user.password_hash
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password."
      });
    }

    req.session.user = {
      id: user.user_id,
      email: user.email
    };

    return res.json({
      message: "Sign in successful.",
      user: req.session.user
    });
  } catch (error) {
    next(error);
  }
});

router.get("/me", (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({
      message: "Sign in to continue."
    });
  }

  return res.json({
    user: req.session.user
  });
});

router.post("/logout", (req, res, next) => {
  req.session.destroy((error) => {
    if (error) {
      return next(error);
    }

    res.clearCookie("connect.sid");

    return res.json({
      message: "Signed out successfully."
    });
  });
});

module.exports = router;