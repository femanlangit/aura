const express = require("express");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.get("/api/movies/search", (req, res) => {
  const searchTitle = req.query.title;

  if (!searchTitle) {
    return res.status(400).json({
      message: "Please enter a movie title."
    });
  }

  const moviesPath = path.join(__dirname, "data", "movies.json");
  const movies = JSON.parse(fs.readFileSync(moviesPath, "utf8"));

  const movie = movies.find(
    (item) => item.title.toLowerCase() === searchTitle.trim().toLowerCase()
  );

  if (!movie) {
    return res.status(404).json({
      message: "Movie not found in the Aura catalogue."
    });
  }

  res.json(movie);
});

app.post("/api/reviews", (req, res) => {
  const { title, rating, review } = req.body;

  if (!title || !rating || !review) {
    return res.status(400).json({
      message: "Please complete all review fields."
    });
  }

  const reviewsPath = path.join(__dirname, "data", "reviews.json");
  const reviews = JSON.parse(fs.readFileSync(reviewsPath, "utf8"));

  const newReview = {
    id: Date.now(),
    title: title.trim(),
    rating: Number(rating),
    review: review.trim()
  };

  reviews.push(newReview);

  fs.writeFileSync(
    reviewsPath,
    JSON.stringify(reviews, null, 2)
  );

  res.status(201).json({
    message: "Your review was submitted successfully.",
    review: newReview
  });
});

app.listen(PORT, () => {
  console.log(`Aura is running at http://localhost:${PORT}`);
});