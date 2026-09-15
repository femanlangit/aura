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
    const response = await fetch("/api/reviews", {
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
    }
  } catch (error) {
    reviewMessage.textContent =
      "Aura could not submit your review. Please try again.";
  }
});