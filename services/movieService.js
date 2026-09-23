const pool = require("../db/database");
const { findReviewsByMovieId } = require("./reviewService");

async function findMovieByTitle(searchTitle) {
    const [rows] = await pool.query(
        `SELECT movie_id, title, genre, year, director, description
         FROM movies
         WHERE LOWER(title) = LOWER(?)`,
        [searchTitle.trim()]
    );

    return rows[0];
}

async function findMovieById(movieId) {
    const [rows] = await pool.query(
        `SELECT movie_id, title, genre, year, director, description
         FROM movies
         WHERE movie_id = ?
         LIMIT 1`,
        [movieId]
    );

    return rows[0] || null;
}
async function getMovieDetails(movieId) {
    const movie = await findMovieById(movieId);

    if (!movie) {
        return {
            success: false,
            outcome: "movie_not_found",
            message: "The selected movie could not be found."
        };
    }

    const reviews = await findReviewsByMovieId(movieId);
    const reviewCount = reviews.length;

    if (reviewCount === 0) {
        return {
            success: true,
            outcome: "movie_without_reviews",
            data: {
                movie,
                reviewSummary: {
                    reviewCount: 0,
                    averageRating: null
                },
                reviews: []
            }
        };
    }

    const totalRating = reviews.reduce(
        (total, currentReview) => total + Number(currentReview.rating),
        0
    );

    const averageRating = Number(
        (totalRating / reviewCount).toFixed(1)
    );

    return {
        success: true,
        outcome: "movie_with_reviews",
        data: {
            movie,
            reviewSummary: {
                reviewCount,
                averageRating
            },
            reviews
        }
    };
}
module.exports = {
    findMovieByTitle,
    findMovieById,
    getMovieDetails
};