const express = require("express");
const {
  validateReviewContent,
  saveReview,
  getReviews,
  updateReview,
  deleteReview,
} = require("../services/reviewService");
const { requireUser } = require("../middleware/auth");
const {
  requireReviewOwner,
} = require("../middleware/reviewOwnership");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();

    return res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", requireUser, async (req, res, next) => {
  const { title, rating, review } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      message: "Select a movie to review.",
    });
  }

  const validation = validateReviewContent({
    rating,
    review,
  });

  if (!validation.valid) {
    return res.status(400).json({
      message: validation.message,
    });
  }

  try {
    const newReview = await saveReview(
      title,
      validation.data.rating,
      validation.data.review,
      req.session.user.id
    );

    if (!newReview) {
      return res.status(404).json({
        message: "Movie not found.",
      });
    }

    return res.status(201).json({
      message: "Your review was submitted successfully.",
      review: newReview,
    });
  } catch (error) {
    next(error);
  }
});

router.put(
  "/:reviewId",
  requireUser,
  requireReviewOwner("You cannot change this review."),
  async (req, res, next) => {
    const contentValidation = validateReviewContent(req.body);

    if (!contentValidation.valid) {
      return res.status(400).json({
        message: contentValidation.message,
      });
    }

    try {
      const updatedReview = await updateReview(
        req.reviewId,
        contentValidation.data.rating,
        contentValidation.data.review,
        req.session.user.id
      );

      if (!updatedReview) {
        return res.status(404).json({
          message: "Review not found.",
        });
      }

      return res.json({
        message: "Your review was updated successfully.",
        review: updatedReview,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.delete(
  "/:reviewId",
  requireUser,
  requireReviewOwner("You cannot delete this review."),
  async (req, res, next) => {
    try {
      const deleted = await deleteReview(
        req.reviewId,
        req.session.user.id
      );

      if (!deleted) {
        return res.status(404).json({
          message: "Review not found.",
        });
      }

      return res.json({
        message: "Your review was deleted successfully.",
      });
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;