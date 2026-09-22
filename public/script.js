const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-title");
const searchMessage = document.getElementById("search-message");
const movieResults = document.getElementById("movie-results");

searchForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const title = searchInput.value.trim();

  searchMessage.textContent = "";
  movieResults.innerHTML = "";

  if (!title) {
    searchMessage.textContent = "Please enter a movie title.";
    return;
  }

  try {
    const response = await fetch(
      `/api/movies/search?title=${encodeURIComponent(title)}`
    );

    const data = await response.json();

    if (!response.ok) {
      searchMessage.textContent = data.message;
      return;
    }

    movieResults.innerHTML = `
      <article class="movie-card">
        <h3>${data.title}</h3>
        <p class="movie-meta">${data.year} · ${data.genre}</p>
        <p><strong>Director:</strong> ${data.director}</p>
        <p>${data.description}</p>
      </article>
    `;
  } catch (error) {
    searchMessage.textContent =
      "Aura could not complete the search. Please try again.";
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