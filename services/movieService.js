const pool = require("../db/database");
const { findReviewsByMovieId } = require("./reviewService");

async function findMovies({ search = "", genre = "", sort = "title_asc" }) {
    let sql = `
        SELECT movie_id, title, genre, year, director, description
        FROM movies
        WHERE 1 = 1
    `;

    const values = [];

    if (search.trim()) {
        sql += ` AND LOWER(title) LIKE LOWER(?)`;
        values.push(`%${search.trim()}%`);
    }

    if (genre.trim()) {
        sql += ` AND LOWER(genre) = LOWER(?)`;
        values.push(genre.trim());
    }

    if (sort === "title_desc") {
        sql += ` ORDER BY title DESC`;
    } else {
        sql += ` ORDER BY title ASC`;
    }

    const [rows] = await pool.query(sql, values);

    return rows;
}
function validateMovieDiscoveryRequest({ search = "", genre = "", sort = "title_asc" }) {
    const allowedSortValues = ["title_asc", "title_desc"];

    if (!allowedSortValues.includes(sort)) {
        return {
            valid: false,
            message: "Select a valid sorting option."
        };
    }

    return {
        valid: true,
        criteria: {
            search: search.trim(),
            genre: genre.trim(),
            sort
        }
    };
}

async function discoverMovies(criteria) {
    const validation = validateMovieDiscoveryRequest(criteria);

    if (!validation.valid) {
        return {
            success: false,
            outcome: "invalid_discovery_criteria",
            message: validation.message
        };
    }

    const movies = await findMovies(validation.criteria);

    if (movies.length === 0) {
        return {
            success: true,
            outcome: "no_movies_found",
            data: {
                movies: []
            }
        };
    }

    return {
        success: true,
        outcome: "movies_found",
        data: {
            movies
        }
    };
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
    findMovies,
    validateMovieDiscoveryRequest,
    discoverMovies,
    findMovieById,
    getMovieDetails
};