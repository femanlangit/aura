const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-title");
const genreFilter = document.getElementById("genre-filter");
const sortOrder = document.getElementById("sort-order");
const searchMessage = document.getElementById("search-message");
const movieResults = document.getElementById("movie-results");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const search = searchInput.value.trim();
  const genre = genreFilter.value.trim();
  const sort = sortOrder.value;

  searchMessage.textContent = "";
  movieResults.innerHTML = "";

  const params = new URLSearchParams({
    search,
    genre,
    sort
  });

  try {
    const response = await fetch(
      `/api/movies/search?${params.toString()}`
    );

    const result = await response.json();

    if (!response.ok) {
      searchMessage.textContent = result.message;
      return;
    }

    if (result.outcome === "no_movies_found") {
      searchMessage.textContent =
        "No movies match your current search and filter.";
      return;
    }

    const movies = result.data.movies;

    movieResults.innerHTML = movies
      .map(
        (movie) => `
          <article class="movie-card">
            <h3>${movie.title}</h3>
            <p class="movie-meta">${movie.year} · ${movie.genre}</p>
            <p><strong>Director:</strong> ${movie.director}</p>
            <p>${movie.description}</p>
            <button
              type="button"
              class="view-movie-details"
              data-movie-id="${movie.movie_id}"
            >
              View Details
            </button>
          </article>
        `
      )
      .join("");
  } catch (error) {
    searchMessage.textContent =
      "Aura could not load the catalogue. Please try again.";
  }
});

movieResults.addEventListener("click", async (event) => {
  const detailsButton = event.target.closest(".view-movie-details");

  if (!detailsButton) {
    return;
  }

  const movieId = detailsButton.dataset.movieId;

  searchMessage.textContent = "";

  try {
    const response = await fetch(
      `/api/movies/${movieId}/details`
    );

    const result = await response.json();

    if (!response.ok) {
      searchMessage.textContent = result.message;
      return;
    }

    const {
      movie,
      reviewSummary,
      reviews
    } = result.data;

    let reviewSummaryHtml = "";

    if (result.outcome === "movie_without_reviews") {
      reviewSummaryHtml = `
        <div class="movie-review-summary">
          <p><strong>Average rating:</strong> No reviews yet</p>
          <p>Be the first to review this movie.</p>
        </div>
      `;
    } else {
      reviewSummaryHtml = `
        <div class="movie-review-summary">
          <p>
            <strong>Average rating:</strong>
            ${reviewSummary.averageRating}/5
          </p>
          <p>
            Based on ${reviewSummary.reviewCount}
            ${reviewSummary.reviewCount === 1 ? "review" : "reviews"}
          </p>
        </div>
      `;
    }

    const relatedReviewsHtml = reviews.length
      ? reviews
          .map(
            (savedReview) => `
              <article class="movie-related-review">
                <p><strong>Rating:</strong> ${savedReview.rating}/5</p>
                <p>${savedReview.review}</p>
              </article>
            `
          )
          .join("")
      : "";

    movieResults.innerHTML = `
      <article class="movie-card">
        <h3>${movie.title}</h3>
        <p class="movie-meta">${movie.year} · ${movie.genre}</p>
        <p><strong>Director:</strong> ${movie.director}</p>
        <p>${movie.description}</p>

        ${reviewSummaryHtml}

        <div class="movie-related-reviews">
          ${relatedReviewsHtml}
        </div>
      </article>
    `;
  } catch (error) {
    searchMessage.textContent =
      "Aura could not load the movie details. Please try again.";
  }
});
const reviewForm = document.getElementById("review-form");
const reviewMessage = document.getElementById("review-message");
const savedReviewsList = document.getElementById("saved-reviews-list");

let editingReviewId = null;

async function loadReviews() {
  try {
    const response = await fetch("/api/reviews");
    const reviews = await response.json();

    if (!response.ok) {
      savedReviewsList.innerHTML = "<p>Reviews could not be loaded.</p>";
      return;
    }

    if (reviews.length === 0) {
      savedReviewsList.innerHTML = "<p>No reviews have been submitted yet.</p>";
      return;
    }

    savedReviewsList.innerHTML = reviews
      .map(
        (savedReview) => `
          <article
            class="saved-review"
            data-review-id="${savedReview.review_id}"
            data-rating="${savedReview.rating}"
            data-review="${savedReview.review}"
          >
            <h4>${savedReview.title}</h4>
            <p><strong>Rating:</strong> ${savedReview.rating}/5</p>
            <p>${savedReview.review}</p>
            <div class="review-actions">
              <button type="button" class="edit-review">Edit</button>
              <button type="button" class="delete-review">Delete</button>
            </div>
          </article>
        `
      )
      .join("");
  } catch (error) {
    savedReviewsList.innerHTML = "<p>Reviews could not be loaded.</p>";
  }
}
savedReviewsList.addEventListener("click", async (event) => {
  const reviewCard = event.target.closest(".saved-review");

if (!reviewCard) {
  return;
}

const reviewId = reviewCard.dataset.reviewId;

if (event.target.classList.contains("delete-review")) {
  const confirmed = window.confirm(
    "Delete this review? This action cannot be undone."
  );

  if (!confirmed) {
    return;
  }

  try {
    const response = await fetch(`/api/reviews/${reviewId}`, {
      method: "DELETE"
    });

    const data = await response.json();

    reviewMessage.textContent = data.message;

    if (response.ok) {
      if (editingReviewId === reviewId) {
        editingReviewId = null;
        reviewForm.reset();
        document.getElementById("review-title").disabled = false;
        reviewForm.querySelector('button[type="submit"]').textContent =
          "Submit Review";
      }

      await loadReviews();
    }
  } catch (error) {
    reviewMessage.textContent =
      "Your review could not be deleted. Please try again.";
  }

  return;
}

if (!event.target.classList.contains("edit-review")) {
  return;
}

  editingReviewId = reviewCard.dataset.reviewId;

  document.getElementById("review-title").value =
    reviewCard.querySelector("h4").textContent;

  document.getElementById("rating").value =
    reviewCard.dataset.rating;

  document.getElementById("review-text").value =
    reviewCard.dataset.review;

  document.getElementById("review-title").disabled = true;

  reviewForm.querySelector('button[type="submit"]').textContent =
    "Save Changes";

  reviewMessage.textContent =
    "Editing your saved review.";
});

reviewForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = document.getElementById("review-title").value.trim();
  const rating = document.getElementById("rating").value;
  const review = document.getElementById("review-text").value.trim();

  reviewMessage.textContent = "";

  if (!title || !rating || !review) {
    reviewMessage.textContent = "Please complete all review fields.";
    return;
  }

  try {
    const response = editingReviewId
  ? await fetch(`/api/reviews/${editingReviewId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        rating,
        review
      })
    })
  : await fetch("/api/reviews", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title,
        rating,
        review
      })
    });

    const data = await response.json();

    reviewMessage.textContent = data.message;

    if (response.ok) {
  reviewForm.reset();

  editingReviewId = null;

  document.getElementById("review-title").disabled = false;

  reviewForm.querySelector('button[type="submit"]').textContent =
    "Submit Review";

  await loadReviews();
}
  } catch (error) {
    reviewMessage.textContent =
      "Aura could not submit your review. Please try again.";
  }
});
loadReviews();