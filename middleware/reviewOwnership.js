const {
  validateReviewId,
  findReviewOwner,
} = require("../services/reviewService");

function requireReviewOwner(actionMessage) {
  return async (req, res, next) => {
    const idValidation = validateReviewId(req.params.reviewId);

    if (!idValidation.valid) {
      return res.status(400).json({
        message: idValidation.message,
      });
    }

    try {
      const existingReview = await findReviewOwner(
        idValidation.reviewId
      );

      if (!existingReview) {
        return res.status(404).json({
          message: "Review not found.",
        });
      }

      if (existingReview.user_id !== req.session.user.id) {
        return res.status(403).json({
          message: actionMessage,
        });
      }

      req.reviewId = idValidation.reviewId;
      next();
    } catch (error) {
      next(error);
    }
  };
}

module.exports = {
  requireReviewOwner,
};