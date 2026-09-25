const pool = require("../db/database");
function validateReviewContent({ rating, review }) {
  const numericRating = Number(rating);
  const cleanedReview = typeof review === "string"
    ? review.trim()
    : "";

  if (
    !Number.isInteger(numericRating) ||
    numericRating < 1 ||
    numericRating > 5
  ) {
    return {
      valid: false,
      message: "Select a rating from 1 to 5."
    };
  }

  if (!cleanedReview) {
    return {
      valid: false,
      message: "Enter your review."
    };
  }

  return {
    valid: true,
    data: {
      rating: numericRating,
      review: cleanedReview
    }
  };
}

function validateReviewId(reviewId) {
  const numericReviewId = Number(reviewId);

  if (!Number.isInteger(numericReviewId) || numericReviewId <= 0) {
    return {
      valid: false,
      message: "Select a valid review."
    };
  }

  return {
    valid: true,
    reviewId: numericReviewId
  };
}
async function saveReview(title, rating, review) {
  const [movies] = await pool.query(
    `SELECT movie_id, title
     FROM movies
     WHERE LOWER(title) = LOWER(?)`,
    [title.trim()]
  );

  const movie = movies[0];

  if (!movie) {
    return null;
  }

  const [result] = await pool.execute(
    `INSERT INTO reviews (movie_id, rating, review)
     VALUES (?, ?, ?)`,
    [movie.movie_id, Number(rating), review.trim()]
  );

  return {
    review_id: result.insertId,
    movie_id: movie.movie_id,
    title: movie.title,
    rating: Number(rating),
    review: review.trim()
  };
}
async function getReviews() {
  const [rows] = await pool.query(
    `SELECT
       r.review_id,
       r.rating,
       r.review,
       m.movie_id,
       m.title
     FROM reviews r
     JOIN movies m ON r.movie_id = m.movie_id
     ORDER BY r.review_id DESC`
  );

   return rows;
}
async function findReviewsByMovieId(movieId) {
    const [rows] = await pool.query(
        `SELECT review_id, movie_id, rating, review
         FROM reviews
         WHERE movie_id = ?
         ORDER BY review_id DESC`,
        [movieId]
    );

    return rows;
}
async function updateReview(reviewId, rating, review) {
  const [result] = await pool.execute(
    `UPDATE reviews
     SET rating = ?, review = ?
     WHERE review_id = ?`,
    [Number(rating), review.trim(), reviewId]
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return {
    review_id: Number(reviewId),
    rating: Number(rating),
    review: review.trim()
  };
}
async function deleteReview(reviewId) {
  const [result] = await pool.execute(
    `DELETE FROM reviews
     WHERE review_id = ?`,
    [reviewId]
  );

  if (result.affectedRows === 0) {
    return false;
  }

  return true;
}
module.exports = {
  validateReviewContent,
  validateReviewId,
  saveReview,
  getReviews,
  findReviewsByMovieId,
  updateReview,
  deleteReview
};
