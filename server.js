const express = require("express");
const cors = require("cors");
const path = require("path");
const manifest = require("./manifest");
const defaultCatalog = require("./catalog");
const { initializeTMDB, getMovies, getSeries, getCacheInfo } = require("./tmdb-service");

const app = express();
// Use Replit's PORT environment variable or default to 3000
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Initialize TMDB data on startup
initializeTMDB().catch(err => {
  console.error('Warning: TMDB initialization failed, using fallback catalog');
});

// Combine all content (will use TMDB data when available)
let allContent = [...defaultCatalog.movies, ...defaultCatalog.series];

// Manifest endpoint
app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

// Catalog endpoint - returns catalog with items (with auto-update from TMDB)
app.get("/catalog/:type/:id.json", async (req, res) => {
  const { type, id } = req.params;
  const { genre, skip = 0 } = req.query;

  try {
    // Fetch from TMDB (with cache and pagination) or use default catalog
    let tmdbMovies = [];
    let tmdbSeries = [];
    const skipNum = parseInt(skip) || 0;
    const pageSize = 20;

    if (type === "movie") {
      // For genre-specific catalogs, we need all movies to filter properly
      if (id.includes('_movies_') && id !== 'tamil_movies') {
        tmdbMovies = await getMovies(false, 0, 1000); // Get many movies for filtering
      } else {
        tmdbMovies = await getMovies(false, skipNum, pageSize);
      }
    } else if (type === "series") {
      tmdbSeries = await getSeries(false, skipNum, pageSize);
    }

    let items = [];
    let catalogName = "";

    // ===== MAIN CATALOGS =====
    if (id === "tamil_movies") {
      items = tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies.slice(skipNum, skipNum + pageSize);
      catalogName = "Tamil Movies";
    } else if (id === "tamil_series") {
      items = tmdbSeries.length > 0 ? tmdbSeries : defaultCatalog.series.slice(skipNum, skipNum + pageSize);
      catalogName = "Tamil Series";
    }

    // ===== SPECIAL COLLECTIONS =====
    else if (id === "tamil_movies_recent") {
      items = tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies;
      catalogName = "Latest Tamil Movies";
      items.sort((a, b) => b.year - a.year);
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_movies_classics") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m =>
        m.year >= 1980 && m.year <= 1995
      );
      catalogName = "Classic Tamil Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_movies_toprated") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => m.rating >= 7.0);
      items.sort((a, b) => b.rating - a.rating);
      catalogName = "Top Rated Tamil Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_series_trending") {
      items = tmdbSeries.length > 0 ? tmdbSeries : defaultCatalog.series;
      catalogName = "Trending Tamil Series";
      items.sort((a, b) => b.year - a.year);
      items = items.slice(skipNum, skipNum + pageSize);
    }

    // ===== DUBBED CONTENT =====
    else if (id === "tamil_dubbed_movies") {
      items = defaultCatalog.movies.filter(m => m.language === "Dubbed Tamil");
      catalogName = "Dubbed Tamil Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_dubbed_series") {
      items = defaultCatalog.series.filter(s => s.language === "Dubbed Tamil");
      catalogName = "Dubbed Tamil Series";
      items = items.slice(skipNum, skipNum + pageSize);
    }

    // ===== GENRE-WISE MOVIES =====
    else if (id === "tamil_movies_action") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m =>
        m.genres.includes("Action")
      );
      catalogName = "Tamil Action Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_movies_drama") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m =>
        m.genres.includes("Drama")
      );
      catalogName = "Tamil Drama Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_movies_romance") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m =>
        m.genres.includes("Romance")
      );
      catalogName = "Tamil Romance Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_movies_comedy") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m =>
        m.genres.includes("Comedy")
      );
      catalogName = "Tamil Comedy Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    } else if (id === "tamil_movies_thriller") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m =>
        m.genres.includes("Thriller")
      );
      catalogName = "Tamil Thriller Movies";
      items = items.slice(skipNum, skipNum + pageSize);
    }

    // Filter by genre if provided
    if (genre) {
      items = items.filter((item) =>
        item.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
      );
    }

    // Apply pagination (skipNum already declared above)
    const paginatedItems = items.slice(skipNum, skipNum + pageSize);

    // Format response for Stremio
    const metas = paginatedItems.map((item) => ({
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
    }));

    res.json({ metas });
  } catch (error) {
    console.error('Catalog error:', error);
    res.status(500).json({ error: 'Failed to fetch catalog' });
  }
});

// Meta endpoint - returns metadata for a specific item
app.get("/meta/:type/:id.json", async (req, res) => {
  const { type, id } = req.params;

  try {
    // Try to find in TMDB data first
    let tmdbMovies = [];
    let tmdbSeries = [];
    
    if (type === "movie") {
      tmdbMovies = await getMovies();
    } else if (type === "series") {
      tmdbSeries = await getSeries();
    }

    let allItems = type === "movie" 
      ? [...tmdbMovies, ...defaultCatalog.movies]
      : [...tmdbSeries, ...defaultCatalog.series];

    const item = allItems.find((c) => c.id === id);

    if (!item) {
      return res.status(404).json({ error: "Not found" });
    }

    const meta = {
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
      year: item.year,
      director: "Tamil Director",
      cast: ["Actor 1", "Actor 2", "Actor 3"],
      runtime: item.type === "movie" ? 140 : 45,
      videos:
        item.type === "movie"
          ? [
              {
                id: item.id,
                title: item.name,
                season: 0,
                episode: 0,
                released: new Date(item.year, 0, 1).toISOString()
              }
            ]
          : Array.from(
              { length: item.episodesCount || 10 },
              (_, i) => ({
                id: `${item.id}_s1e${i + 1}`,
                title: `Episode ${i + 1}`,
                season: 1,
                episode: i + 1,
                released: new Date(item.year, 0, i + 1).toISOString()
              })
            )
    };

    res.json({ meta });
  } catch (error) {
    console.error('Meta error:', error);
    res.status(500).json({ error: 'Failed to fetch metadata' });
  }
});

// Stream endpoint (returns empty for now - can be extended)
app.get("/stream/:type/:id.json", (req, res) => {
  res.json({ streams: [] });
});

// Admin endpoints for cache management
app.get("/admin/cache-info", (req, res) => {
  try {
    const cacheInfo = getCacheInfo();
    res.json(cacheInfo);
  } catch (error) {
    console.error('Cache info error:', error);
    res.status(500).json({ error: 'Failed to get cache info' });
  }
});

app.post("/admin/clear-cache", (req, res) => {
  try {
    cache.movies = null;
    cache.series = null;
    cache.lastUpdated = 0;
    console.log('🗑️  TMDB cache cleared manually');
    res.send('✅ TMDB cache cleared successfully!');
  } catch (error) {
    console.error('Cache clear error:', error);
    res.status(500).send('❌ Error clearing cache');
  }
});

app.post("/admin/force-refresh", async (req, res) => {
  try {
    console.log('🔄 Force refreshing TMDB data...');
    await getMovies(true); // Force refresh
    await getSeries(true); // Force refresh
    res.send('✅ TMDB data refreshed successfully!');
  } catch (error) {
    console.error('Force refresh error:', error);
    res.status(500).send('❌ Error refreshing data');
  }
});

// Root endpoint - Serve lightweight HTML interface
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`\n✅ Tamil Movies & Series Addon is running!`);
  console.log(`📺 Access it at: http://localhost:${PORT}`);
  console.log(`📋 Manifest URL: http://localhost:${PORT}/manifest.json`);
  console.log(`🔄 TMDB Auto-Update: Enabled (updates every 6 hours)`);
  console.log(`📌 Use this URL in Stremio to install the add-on\n`);
});

module.exports = app;
