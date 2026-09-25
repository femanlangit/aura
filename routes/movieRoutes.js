const express = require("express");
const {
    discoverMovies,
    getMovieDetails
} = require("../services/movieService");

const router = express.Router();

router.get("/search", async (req, res, next) => {
    const criteria = {
        search: req.query.search || "",
        genre: req.query.genre || "",
        sort: req.query.sort || "title_asc"
    };

    try {
        const result = await discoverMovies(criteria);

        if (!result.success) {
            return res.status(400).json(result);
        }

        return res.json(result);
    } catch (error) {
        next(error);
    }
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