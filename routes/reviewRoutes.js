const express = require("express");
const {
  validateReviewContent,
  validateReviewId,
  saveReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../services/reviewService");

const router = express.Router();

router.get("/", async (req, res, next) => {
  try {
    const reviews = await getReviews();

    return res.json(reviews);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  const { title, rating, review } = req.body;

  if (!title?.trim()) {
    return res.status(400).json({
      message: "Select a movie to review."
    });
  }

  const validation = validateReviewContent({
    rating,
    review
  });

  if (!validation.valid) {
    return res.status(400).json({
      message: validation.message
    });
  }

  try {
    const newReview = await saveReview(
      title,
      validation.data.rating,
      validation.data.review
    );

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
    next(error);
  }
});

router.put("/:reviewId", async (req, res, next) => {
  const idValidation = validateReviewId(req.params.reviewId);

  if (!idValidation.valid) {
    return res.status(400).json({
      message: idValidation.message
    });
  }

  const contentValidation = validateReviewContent(req.body);

  if (!contentValidation.valid) {
    return res.status(400).json({
      message: contentValidation.message
    });
  }

  try {
    const updatedReview = await updateReview(
      idValidation.reviewId,
      contentValidation.data.rating,
      contentValidation.data.review
    );

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
    next(error);
  }
});

router.delete("/:reviewId", async (req, res, next) => {
  const idValidation = validateReviewId(req.params.reviewId);

  if (!idValidation.valid) {
    return res.status(400).json({
      message: idValidation.message
    });
  }

  try {
    const deleted = await deleteReview(idValidation.reviewId);

    if (!deleted) {
      return res.status(404).json({
        message: "Review not found."
      });
    }

    return res.json({
      message: "Your review was deleted successfully."
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;