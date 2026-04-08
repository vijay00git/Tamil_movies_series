/**
 * TMDB Service - Fetches latest Tamil movies and series
 * Updates catalog automatically from The Movie Database API
 */

const https = require('https');

const TMDB_API_KEY = 'eb9c2f1df5b12f9afbbde81d8c6b577e';
const TMDB_BASE_URL = 'https://api.themoviedb.org/3';

// Cache for API responses
const cache = {
  movies: null,
  series: null,
  lastUpdated: 0,
  cacheExpiry: 6 * 60 * 60 * 1000 // 6 hours in milliseconds
};

/**
 * Fetch data from TMDB API
 */
function fetchFromTMDB(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(new Error(`Invalid JSON from TMDB: ${e.message}`));
        }
      });
    }).on('error', (err) => {
      reject(new Error(`TMDB API Error: ${err.message}`));
    });
  });
}

/**
 * Format TMDB movie data to our catalog format
 */
function formatMovie(tmdbMovie) {
  return {
    id: `tmdb_movie_${tmdbMovie.id}`,
    name: tmdbMovie.title || tmdbMovie.original_title,
    genres: tmdbMovie.genre_ids ? getGenreNames(tmdbMovie.genre_ids) : [],
    type: 'movie',
    poster: tmdbMovie.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbMovie.poster_path}`
      : 'https://via.placeholder.com/260x390?text=No+Poster',
    background: tmdbMovie.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${tmdbMovie.backdrop_path}`
      : 'https://via.placeholder.com/1024x576?text=No+Background',
    description: tmdbMovie.overview || 'No description available',
    year: tmdbMovie.release_date ? parseInt(tmdbMovie.release_date.split('-')[0]) : 0,
    rating: tmdbMovie.vote_average || 7.0
  };
}

/**
 * Format TMDB series data to our catalog format
 */
function formatSeries(tmdbSeries) {
  return {
    id: `tmdb_series_${tmdbSeries.id}`,
    name: tmdbSeries.name || tmdbSeries.original_name,
    genres: tmdbSeries.genre_ids ? getGenreNames(tmdbSeries.genre_ids) : [],
    type: 'series',
    poster: tmdbSeries.poster_path
      ? `https://image.tmdb.org/t/p/w500${tmdbSeries.poster_path}`
      : 'https://via.placeholder.com/260x390?text=No+Poster',
    background: tmdbSeries.backdrop_path
      ? `https://image.tmdb.org/t/p/w1280${tmdbSeries.backdrop_path}`
      : 'https://via.placeholder.com/1024x576?text=No+Background',
    description: tmdbSeries.overview || 'No description available',
    year: tmdbSeries.first_air_date ? parseInt(tmdbSeries.first_air_date.split('-')[0]) : 0,
    rating: tmdbSeries.vote_average || 7.0,
    seasons: tmdbSeries.number_of_seasons || 1,
    episodesCount: tmdbSeries.number_of_episodes || 10
  };
}

/**
 * Get genre names from IDs
 */
function getGenreNames(genreIds) {
  const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Sci-Fi',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
  };

  return genreIds
    .map((id) => genreMap[id])
    .filter((genre) => genre);
}

/**
 * Fetch Tamil movies from TMDB
 */
async function fetchTamilMovies() {
  try {
    console.log('📽️  Fetching Tamil movies from TMDB...');

    // Search for Tamil language movies with high ratings
    const url = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=ta&sort_by=popularity.desc&vote_average.gte=5&page=1`;

    const response = await fetchFromTMDB(url);
    const movies = response.results ? response.results.map(formatMovie) : [];

    console.log(`✅ Fetched ${movies.length} Tamil movies from TMDB`);
    return movies;
  } catch (error) {
    console.error('❌ Error fetching Tamil movies:', error.message);
    return [];
  }
}

/**
 * Fetch Tamil series from TMDB
 */
async function fetchTamilSeries() {
  try {
    console.log('📺 Fetching Tamil series from TMDB...');

    // Search for Tamil language series with high ratings
    const url = `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=ta&sort_by=popularity.desc&vote_average.gte=5&page=1`;

    const response = await fetchFromTMDB(url);
    const series = response.results ? response.results.map(formatSeries) : [];

    console.log(`✅ Fetched ${series.length} Tamil series from TMDB`);
    return series;
  } catch (error) {
    console.error('❌ Error fetching Tamil series:', error.message);
    return [];
  }
}

/**
 * Check if cache is still valid
 */
function isCacheValid() {
  const now = Date.now();
  return cache.lastUpdated && now - cache.lastUpdated < cache.cacheExpiry;
}

/**
 * Get movies with auto-update
 */
async function getMovies(forceRefresh = false) {
  if (!forceRefresh && isCacheValid() && cache.movies) {
    console.log('📚 Using cached movies');
    return cache.movies;
  }

  const movies = await fetchTamilMovies();
  if (movies.length > 0) {
    cache.movies = movies;
    cache.lastUpdated = Date.now();
  }

  return cache.movies || [];
}

/**
 * Get series with auto-update
 */
async function getSeries(forceRefresh = false) {
  if (!forceRefresh && isCacheValid() && cache.series) {
    console.log('📚 Using cached series');
    return cache.series;
  }

  const series = await fetchTamilSeries();
  if (series.length > 0) {
    cache.series = series;
    cache.lastUpdated = Date.now();
  }

  return cache.series || [];
}

/**
 * Update cache on startup
 */
async function initializeTMDB() {
  console.log('\n🚀 Initializing TMDB data fetch...');
  console.log('📡 API Key: ' + TMDB_API_KEY.substring(0, 5) + '...');

  try {
    // Fetch in parallel
    const [movies, series] = await Promise.all([
      fetchTamilMovies(),
      fetchTamilSeries()
    ]);

    cache.movies = movies;
    cache.series = series;
    cache.lastUpdated = Date.now();

    console.log(`✅ TMDB initialized with ${movies.length} movies + ${series.length} series`);

    // Setup auto-refresh every 6 hours
    setInterval(async () => {
      console.log('🔄 Auto-refreshing TMDB data...');
      await getMovies(true);
      await getSeries(true);
    }, cache.cacheExpiry);
  } catch (error) {
    console.error('⚠️  Failed to initialize TMDB:', error.message);
  }
}

module.exports = {
  initializeTMDB,
  getMovies,
  getSeries,
  isCacheValid
};
