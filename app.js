const express = require("express");

const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(PORT, () => {
    console.log(`Aura is running at http://localhost:${PORT}`);
});