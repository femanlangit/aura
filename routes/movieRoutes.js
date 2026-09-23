const express = require("express");
const {
    findMovieByTitle,
    getMovieDetails
} = require("../services/movieService");

const router = express.Router();

router.get("/search", async (req, res) => {
    const searchTitle = req.query.title;

    if (!searchTitle) {
        return res.status(400).json({
            message: "Please enter a movie title."
        });
    }

    const movie = await findMovieByTitle(searchTitle);

    if (!movie) {
        return res.status(404).json({
            message: "Movie not found in the Aura catalogue."
        });
    }

    res.json(movie);
});
router.get("/:movieId/details", async (req, res, next) => {
    const movieId = Number(req.params.movieId);

    if (!Number.isInteger(movieId) || movieId <= 0) {
        return res.status(400).json({
            success: false,
            outcome: "invalid_movie_id",
            message: "Select a valid movie."
        });
    }

    try {
        const result = await getMovieDetails(movieId);

        if (!result.success) {
            return res.status(404).json(result);
        }

        return res.json(result);
    } catch (error) {
        next(error);
    }
});
module.exports = router;