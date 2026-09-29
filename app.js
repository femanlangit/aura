const express = require("express");
const session = require("express-session");

const movieRoutes = require("./routes/movieRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const authRoutes = require("./routes/authRoutes");

const app = express();
const PORT = 3000;

app.use(express.static("public"));
app.use(express.json());

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/reviews", reviewRoutes);

app.use((error, req, res, next) => {
    console.error(error);

    return res.status(500).json({
        success: false,
        outcome: "technical_error",
        message: "The request could not be completed. Please try again.",
        data: null
    });
});

app.listen(PORT, () => {
    console.log(`Aura is running at http://localhost:${PORT}`);
});