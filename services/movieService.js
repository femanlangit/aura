const pool = require("../db/database");

async function findMovieByTitle(searchTitle) {
    const [rows] = await pool.query(
        `SELECT movie_id, title, genre, year, director, description
         FROM movies
         WHERE LOWER(title) = LOWER(?)`,
        [searchTitle.trim()]
    );

    return rows[0];
}

module.exports = {
    findMovieByTitle
};