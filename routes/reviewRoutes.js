const express = require("express");
const {
  saveReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../services/reviewService");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const reviews = await getReviews();

    return res.json(reviews);
  } catch (error) {
    console.error("Review retrieval failed:", error);

    return res.status(500).json({
      message: "Reviews could not be loaded. Please try again."
    });
  }
});
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

router.put("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;
  const { rating, review } = req.body;

  if (rating == null || !review?.trim()) {
    return res.status(400).json({
      message: "Please complete the rating and review."
    });
  }

  try {
    const updatedReview = await updateReview(reviewId, rating, review);

    if (!updatedReview) {
      return res.status(404).json({
        message: "Review not found."
      });
    }

    return res.json({
      message: "Your review was updated successfully.",
      review: updatedReview
    });
  } catch (error) {
    console.error("Review update failed:", error);

    return res.status(500).json({
      message: "Your review could not be updated. Please try again."
    });
  }
});
router.delete("/:reviewId", async (req, res) => {
  const { reviewId } = req.params;

  try {
    const deleted = await deleteReview(reviewId);

    if (!deleted) {
      return res.status(404).json({
        message: "Review not found."
      });
    }

    return res.json({
      message: "Your review was deleted successfully."
    });
  } catch (error) {
    console.error("Review deletion failed:", error);

    return res.status(500).json({
      message: "Your review could not be deleted. Please try again."
    });
  }
});
module.exports = router;