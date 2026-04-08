const express = require("express");
const cors = require("cors");
const manifest = require("./manifest");
const defaultCatalog = require("./catalog");
const { initializeTMDB, getMovies, getSeries } = require("./tmdb-service");

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
    // Fetch from TMDB (with cache) or use default catalog
    let tmdbMovies = [];
    let tmdbSeries = [];
    
    if (type === "movie") {
      tmdbMovies = await getMovies();
    } else if (type === "series") {
      tmdbSeries = await getSeries();
    }

    let items = [];
    let catalogName = "";

    // ===== MAIN CATALOGS =====
    if (id === "tamil_movies") {
      items = tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies;
      catalogName = "Tamil Movies";
    } else if (id === "tamil_series") {
      items = tmdbSeries.length > 0 ? tmdbSeries : defaultCatalog.series;
      catalogName = "Tamil Series";
    }

    // ===== SPECIAL COLLECTIONS =====
    else if (id === "tamil_movies_recent") {
      items = tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies;
      catalogName = "Latest Tamil Movies";
      items.sort((a, b) => b.year - a.year);
    } else if (id === "tamil_movies_classics") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => 
        m.year >= 1980 && m.year <= 1995
      );
      catalogName = "Classic Tamil Movies";
    } else if (id === "tamil_movies_toprated") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => m.rating >= 7.0);
      items.sort((a, b) => b.rating - a.rating);
      catalogName = "Top Rated Tamil Movies";
    } else if (id === "tamil_series_trending") {
      items = tmdbSeries.length > 0 ? tmdbSeries : defaultCatalog.series;
      catalogName = "Trending Tamil Series";
      items.sort((a, b) => b.year - a.year);
    }

    // ===== DUBBED CONTENT =====
    else if (id === "tamil_dubbed_movies") {
      items = defaultCatalog.movies.filter(m => m.language === "Dubbed Tamil");
      catalogName = "Dubbed Tamil Movies";
    } else if (id === "tamil_dubbed_series") {
      items = defaultCatalog.series.filter(s => s.language === "Dubbed Tamil");
      catalogName = "Dubbed Tamil Series";
    }

    // ===== GENRE-WISE MOVIES =====
    else if (id === "tamil_movies_action") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => 
        m.genres.includes("Action")
      );
      catalogName = "Tamil Action Movies";
    } else if (id === "tamil_movies_drama") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => 
        m.genres.includes("Drama")
      );
      catalogName = "Tamil Drama Movies";
    } else if (id === "tamil_movies_romance") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => 
        m.genres.includes("Romance")
      );
      catalogName = "Tamil Romance Movies";
    } else if (id === "tamil_movies_comedy") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => 
        m.genres.includes("Comedy")
      );
      catalogName = "Tamil Comedy Movies";
    } else if (id === "tamil_movies_thriller") {
      items = (tmdbMovies.length > 0 ? tmdbMovies : defaultCatalog.movies).filter(m => 
        m.genres.includes("Thriller")
      );
      catalogName = "Tamil Thriller Movies";
    }

    // Filter by genre if provided
    if (genre) {
      items = items.filter((item) =>
        item.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
      );
    }

    // Apply pagination
    const skipNum = parseInt(skip) || 0;
    const pageSize = 20;
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

// Root endpoint
app.get("/", (req, res) => {
  res.send(`
    <html>
      <head>
        <title>Tamil Movies & Series Addon</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            margin: 0;
            padding: 20px;
            min-height: 100vh;
          }
          .container {
            max-width: 800px;
            margin: 0 auto;
            background: rgba(0,0,0,0.3);
            padding: 30px;
            border-radius: 10px;
          }
          h1 { margin-top: 0; }
          .info {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 5px;
            margin: 15px 0;
          }
          .endpoint {
            background: rgba(0,0,0,0.3);
            padding: 10px;
            margin: 5px 0;
            border-radius: 3px;
            font-family: monospace;
          }
          a { color: #ffd700; text-decoration: none; }
          a:hover { text-decoration: underline; }
        </style>
      </head>
      <body>
        <div class="container">
          <h1>🎬 Tamil Movies & Series Addon</h1>
          <div class="info">
            <p>This is a Stremio add-on for Tamil movies and TV series with genre filtering and comprehensive cataloging.</p>
          </div>
          
          <h2>Installation</h2>
          <div class="info">
            <p>Copy this URL and paste it in Stremio:</p>
            <div class="endpoint">http://localhost:3000/manifest.json</div>
          </div>

          <h2>API Endpoints</h2>
          <div class="endpoint">/manifest.json - Add-on manifest</div>
          <div class="endpoint">/catalog/movie/tamil_movies.json - All Tamil movies</div>
          <div class="endpoint">/catalog/series/tamil_series.json - All Tamil series</div>
          <div class="endpoint">/catalog/movie/tamil_movies_recent.json - Latest movies</div>
          <div class="endpoint">/catalog/series/tamil_series_trending.json - Trending series</div>
          <div class="endpoint">/meta/movie/{id}.json - Movie details</div>
          <div class="endpoint">/meta/series/{id}.json - Series details</div>

          <h2>Features</h2>
          <ul>
            <li>✅ Complete catalog of Tamil movies and series</li>
            <li>✅ 🔄 Auto-updates from TMDB API (every 6 hours)</li>
            <li>✅ Multiple genres: Action, Comedy, Drama, Romance, Thriller, Horror, etc.</li>
            <li>✅ Genre filtering support</li>
            <li>✅ Pagination support</li>
            <li>✅ Latest and trending content</li>
            <li>✅ Rich metadata for each item</li>
            <li>✅ Dubbed Tamil movies and series</li>
            <li>✅ Classic movies and top-rated collections</li>
          </ul>

          <p><strong>Status:</strong> Running on port ${PORT}</p>
          <p><strong>Data Source:</strong> TMDB API + Fallback Catalog</p>
        </div>
      </body>
    </html>
  `);
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
