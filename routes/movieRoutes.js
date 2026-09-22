const express = require("express");
const { findMovieByTitle } = require("../services/movieService");

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

module.exports = router;