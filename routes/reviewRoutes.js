const express = require("express");
const {
  validateReviewContent,
  validateReviewId,
  findReviewOwner,
  saveReview,
  getReviews,
  updateReview,
  deleteReview
} = require("../services/reviewService");

const { requireUser } = require("../middleware/auth");
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
    validation.data.review,
    req.session.user.id
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

router.put("/:reviewId", requireUser, async (req, res, next) => {
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
    const existingReview = await findReviewOwner(
    idValidation.reviewId
);

if (!existingReview) {
  return res.status(404).json({
    message: "Review not found."
  });
}

if (existingReview.user_id !== req.session.user.id) {
  return res.status(403).json({
    message: "You cannot change this review."
  });
}

    const updatedReview = await updateReview(
    idValidation.reviewId,
    contentValidation.data.rating,
    contentValidation.data.review,
    req.session.user.id
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

router.delete("/:reviewId", requireUser, async (req, res, next) => {
  const idValidation = validateReviewId(req.params.reviewId);

  if (!idValidation.valid) {
    return res.status(400).json({
      message: idValidation.message
    });
  }

  try {
    const existingReview = await findReviewOwner(
    idValidation.reviewId
);

if (!existingReview) {
  return res.status(404).json({
    message: "Review not found."
  });
}

if (existingReview.user_id !== req.session.user.id) {
  return res.status(403).json({
    message: "You cannot delete this review."
  });
}

    const deleted = await deleteReview(
    idValidation.reviewId,
    req.session.user.id
  );

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