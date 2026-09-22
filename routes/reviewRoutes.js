const express = require("express");
const { saveReview } = require("../services/reviewService");

const router = express.Router();

router.post("/", async (req, res) => {
  const { title, rating, review } = req.body;

  if (!title?.trim() || rating == null || !review?.trim()) {
    return res.status(400).json({
      message: "Please complete all review fields."
    });
  }

  try {
    const newReview = await saveReview(title, rating, review);

    if (!newReview) {
      return res.status(404).json({
        message: "Movie not found."
      });
    }

    return res.status(201).json({
      message: "Your review was submitted successfully.",
      review: newReview
    });
  } catch (error) {
    console.error("Review submission failed:", error);

    return res.status(500).json({
      message: "Your review could not be saved. Please try again."
    });
  }
});

module.exports = router;