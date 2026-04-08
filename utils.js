/**
 * Utility functions for Tamil Movies & Series catalog management
 */

// Generate unique ID
function generateId(name, type) {
  const timestamp = Date.now();
  const clean = name.toLowerCase().replace(/[^a-z0-9]/g, "_");
  return `tamil_${type}_${clean}_${timestamp}`.substring(0, 50);
}

// Template for adding a new movie
function createMovie(name, genres, year, description, rating = 7.0) {
  return {
    id: generateId(name, "movie"),
    name: name,
    genres: genres,
    type: "movie",
    poster: `https://via.placeholder.com/260x390?text=${encodeURIComponent(name)}`,
    background: `https://via.placeholder.com/1024x576?text=${encodeURIComponent(name)}`,
    description: description,
    year: year,
    rating: rating
  };
}

// Template for adding a new series
function createSeries(name, genres, year, description, seasons = 1, episodesCount = 10, rating = 7.0) {
  return {
    id: generateId(name, "series"),
    name: name,
    genres: genres,
    type: "series",
    poster: `https://via.placeholder.com/260x390?text=${encodeURIComponent(name)}`,
    background: `https://via.placeholder.com/1024x576?text=${encodeURIComponent(name)}`,
    description: description,
    year: year,
    rating: rating,
    seasons: seasons,
    episodesCount: episodesCount
  };
}

// Format catalog meta for Stremio
function formatMeta(item) {
  return {
    id: item.id,
    type: item.type,
    name: item.name,
    poster: item.poster,
    background: item.background,
    logo: null,
    description: item.description,
    releaseInfo: `${item.year}`,
    imdbRating: item.rating,
    genres: item.genres,
    year: item.year
  };
}

// Filter content by genre
function filterByGenre(items, genre) {
  return items.filter((item) =>
    item.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
  );
}

// Sort content
function sortByYear(items, ascending = false) {
  return [...items].sort((a, b) =>
    ascending ? a.year - b.year : b.year - a.year
  );
}

function sortByRating(items, ascending = false) {
  return [...items].sort((a, b) =>
    ascending ? a.rating - b.rating : b.rating - a.rating
  );
}

// Paginate results
function paginate(items, page = 1, pageSize = 20) {
  const start = (page - 1) * pageSize;
  return items.slice(start, start + pageSize);
}

// Get catalog statistics
function getCatalogStats(movies, series) {
  const allGenres = new Set();
  [...movies, ...series].forEach((item) => {
    item.genres.forEach((genre) => allGenres.add(genre));
  });

  return {
    totalMovies: movies.length,
    totalSeries: series.length,
    totalItems: movies.length + series.length,
    genres: Array.from(allGenres).sort(),
    genreCount: allGenres.size,
    averageMovieRating: (
      movies.reduce((sum, m) => sum + m.rating, 0) / movies.length
    ).toFixed(2),
    averageSeriesRating: (
      series.reduce((sum, s) => sum + s.rating, 0) / series.length
    ).toFixed(2)
  };
}

// Search content
function searchContent(items, query) {
  const q = query.toLowerCase();
  return items.filter(
    (item) =>
      item.name.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q)
  );
}

// Get random items (useful for recommendations)
function getRandomItems(items, count = 5) {
  const shuffled = [...items].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

module.exports = {
  generateId,
  createMovie,
  createSeries,
  formatMeta,
  filterByGenre,
  sortByYear,
  sortByRating,
  paginate,
  getCatalogStats,
  searchContent,
  getRandomItems
};
