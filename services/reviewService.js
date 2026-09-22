const pool = require("../db/database");

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

module.exports = {
  saveReview
};