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
 * Fetch Tamil movies from TMDB - comprehensive approach
 */
async function fetchTamilMovies() {
  try {
    console.log('📽️  Fetching Tamil movies from TMDB...');

    const allMovies = [];
    const maxPages = 5; // Fetch up to 5 pages for more results

    // Strategy 1: Movies with original Tamil language (multiple pages)
    for (let page = 1; page <= maxPages; page++) {
      try {
        const tamilUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en&with_original_language=ta&sort_by=popularity.desc&vote_count.gte=10&page=${page}`;
        const tamilResponse = await fetchFromTMDB(tamilUrl);
        if (tamilResponse.results && tamilResponse.results.length > 0) {
          allMovies.push(...tamilResponse.results.map(formatMovie));
        } else {
          break; // No more pages
        }
      } catch (error) {
        console.log(`⚠️  Tamil page ${page} failed, continuing...`);
        break;
      }
    }

    // Strategy 2: Search for movies with Tamil keywords (multiple pages)
    const tamilKeywords = ['tamil', 'kollywood', 'chennai', 'south indian', 'madras'];
    for (const keyword of tamilKeywords) {
      for (let page = 1; page <= 3; page++) {
        try {
          const searchUrl = `${TMDB_BASE_URL}/search/movie?api_key=${TMDB_API_KEY}&language=en&query=${encodeURIComponent(keyword)}&sort_by=popularity.desc&page=${page}`;
          const searchResponse = await fetchFromTMDB(searchUrl);
          if (searchResponse.results) {
            const newMovies = searchResponse.results
              .filter(movie => movie.vote_count >= 10) // Filter out very low-rated entries
              .map(formatMovie);
            allMovies.push(...newMovies);
          }
        } catch (error) {
          break;
        }
      }
    }

    // Strategy 3: Popular Indian movies (broader search)
    for (let page = 1; page <= maxPages; page++) {
      try {
        const indiaUrl = `${TMDB_BASE_URL}/discover/movie?api_key=${TMDB_API_KEY}&language=en&region=IN&sort_by=popularity.desc&vote_count.gte=50&page=${page}`;
        const indiaResponse = await fetchFromTMDB(indiaUrl);
        if (indiaResponse.results) {
          // Include movies that might be Tamil based on various criteria
          const potentialTamilMovies = indiaResponse.results
            .filter(movie => {
              if (allMovies.some(m => m.id === `tmdb_movie_${movie.id}`)) return false;

              const title = (movie.title || '').toLowerCase();
              const overview = (movie.overview || '').toLowerCase();
              const originalTitle = (movie.original_title || '').toLowerCase();

              // Check for Tamil indicators
              const tamilIndicators = [
                'tamil', 'kollywood', 'chennai', 'madras', 'south indian',
                'rajinikanth', 'kamal haasan', 'vikram', 'ajith', 'karthi',
                'nayanthara', 'samantha', 'katrina', 'deepika', 'priyanka',
                'dhanush', 'suriya', 'vikrant', 'arjun', 'jiiva'
              ];

              return tamilIndicators.some(indicator =>
                title.includes(indicator) ||
                overview.includes(indicator) ||
                originalTitle.includes(indicator)
              );
            })
            .map(formatMovie);
          allMovies.push(...potentialTamilMovies);
        } else {
          break;
        }
      } catch (error) {
        console.log(`⚠️  India region page ${page} failed, continuing...`);
        break;
      }
    }

    // Strategy 4: Top rated movies from India
    try {
      const topRatedUrl = `${TMDB_BASE_URL}/movie/top_rated?api_key=${TMDB_API_KEY}&language=en&region=IN&page=1`;
      const topRatedResponse = await fetchFromTMDB(topRatedUrl);
      if (topRatedResponse.results) {
        const existingIds = new Set(allMovies.map(m => m.id));
        const topRatedMovies = topRatedResponse.results
          .filter(movie => !existingIds.has(`tmdb_movie_${movie.id}`))
          .filter(movie => {
            // Include if it has South Indian indicators
            const title = (movie.title || '').toLowerCase();
            const overview = (movie.overview || '').toLowerCase();
            const southIndianTerms = ['tamil', 'telugu', 'kannada', 'malayalam', 'kollywood', 'tollywood'];
            return southIndianTerms.some(term =>
              title.includes(term) || overview.includes(term)
            );
          })
          .map(formatMovie);
        allMovies.push(...topRatedMovies);
      }
    } catch (error) {
      console.log('⚠️  Top rated query failed, continuing...');
    }

    // Strategy 5: Upcoming movies from India
    try {
      const upcomingUrl = `${TMDB_BASE_URL}/movie/upcoming?api_key=${TMDB_API_KEY}&language=en&region=IN&page=1`;
      const upcomingResponse = await fetchFromTMDB(upcomingUrl);
      if (upcomingResponse.results) {
        const existingIds = new Set(allMovies.map(m => m.id));
        const upcomingMovies = upcomingResponse.results
          .filter(movie => !existingIds.has(`tmdb_movie_${movie.id}`))
          .filter(movie => {
            const title = (movie.title || '').toLowerCase();
            const overview = (movie.overview || '').toLowerCase();
            const tamilKeywords = ['tamil', 'kollywood', 'chennai', 'madras', 'rajini', 'kamal', 'vikram'];
            return tamilKeywords.some(keyword =>
              title.includes(keyword) || overview.includes(keyword)
            );
          })
          .map(movie => ({
            ...formatMovie(movie),
            name: `${movie.title} (Upcoming)`
          }));
        allMovies.push(...upcomingMovies);
      }
    } catch (error) {
      console.log('⚠️  Upcoming movies query failed, continuing...');
    }

    // Remove duplicates and filter out very short/low-quality entries
    const uniqueMovies = allMovies
      .filter((movie, index, self) => index === self.findIndex(m => m.id === movie.id))
      .filter(movie => {
        // Filter out obvious non-feature films and low-quality entries
        const title = movie.name.toLowerCase();
        const excludeTerms = ['short film', 'documentary', 'trailer', 'promo', 'test', 'demo', 'ai short'];
        const hasExcludeTerm = excludeTerms.some(term => title.includes(term));

        // Keep if it's a feature film with decent info
        return !hasExcludeTerm && movie.year > 1950 && movie.description.length > 10;
      });

    // Sort by a combination of popularity, rating, and recency
    uniqueMovies.sort((a, b) => {
      // Prioritize higher rated movies, then newer movies
      const scoreA = (a.rating * 10) + (a.year / 100);
      const scoreB = (b.rating * 10) + (b.year / 100);
      return scoreB - scoreA;
    });

    console.log(`✅ Fetched ${uniqueMovies.length} Tamil movies from TMDB`);
    return uniqueMovies;
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

    // Search for series whose original language is Tamil
    const url = `${TMDB_BASE_URL}/discover/tv?api_key=${TMDB_API_KEY}&language=ta&with_original_language=ta&sort_by=popularity.desc&vote_average.gte=5&page=1`;

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
 * Get movies with auto-update and pagination support
 */
async function getMovies(forceRefresh = false, skip = 0, limit = 100) {
  if (!forceRefresh && isCacheValid() && cache.movies) {
    console.log('📚 Using cached movies');
    const startIndex = parseInt(skip) || 0;
    const endIndex = startIndex + (parseInt(limit) || 100);
    return cache.movies.slice(startIndex, endIndex);
  }

  const movies = await fetchTamilMovies();
  if (movies.length > 0) {
    cache.movies = movies;
    cache.lastUpdated = Date.now();
  }

  const startIndex = parseInt(skip) || 0;
  const endIndex = startIndex + (parseInt(limit) || 100);
  return (cache.movies || []).slice(startIndex, endIndex);
}

/**
 * Get series with auto-update and pagination support
 */
async function getSeries(forceRefresh = false, skip = 0, limit = 100) {
  if (!forceRefresh && isCacheValid() && cache.series) {
    console.log('📚 Using cached series');
    const startIndex = parseInt(skip) || 0;
    const endIndex = startIndex + (parseInt(limit) || 100);
    return cache.series.slice(startIndex, endIndex);
  }

  const series = await fetchTamilSeries();
  if (series.length > 0) {
    cache.series = series;
    cache.lastUpdated = Date.now();
  }

  const startIndex = parseInt(skip) || 0;
  const endIndex = startIndex + (parseInt(limit) || 100);
  return (cache.series || []).slice(startIndex, endIndex);
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
