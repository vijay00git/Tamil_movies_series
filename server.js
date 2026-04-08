const express = require("express");
const cors = require("cors");
const manifest = require("./manifest");
const { movies, series } = require("./catalog");

const app = express();
const PORT = process.env.PORT || 3000;

// Enable CORS
app.use(cors());
app.use(express.json());

// Combine all content
const allContent = [...movies, ...series];

// Manifest endpoint
app.get("/manifest.json", (req, res) => {
  res.json(manifest);
});

// Catalog endpoint - returns catalog with items
app.get("/catalog/:type/:id.json", (req, res) => {
  const { type, id } = req.params;
  const { genre, skip = 0 } = req.query;

  let items = [];
  let catalogName = "";

  // Filter by catalog type
  if (id === "tamil_movies" || id === "tamil_movies_recent") {
    items = movies;
    catalogName = "Tamil Movies";
  } else if (id === "tamil_series" || id === "tamil_series_trending") {
    items = series;
    catalogName = "Tamil Series";
  }

  // Filter by genre if provided
  if (genre) {
    items = items.filter((item) =>
      item.genres.map((g) => g.toLowerCase()).includes(genre.toLowerCase())
    );
  }

  // Sort by year (latest first) for recent catalogs
  if (id === "tamil_movies_recent" || id === "tamil_series_trending") {
    items.sort((a, b) => b.year - a.year);
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
});

// Meta endpoint - returns metadata for a specific item
app.get("/meta/:type/:id.json", (req, res) => {
  const { type, id } = req.params;

  const item = allContent.find((c) => c.id === id);

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
            <li>✅ Multiple genres: Action, Comedy, Drama, Romance, Thriller, Horror, etc.</li>
            <li>✅ Genre filtering support</li>
            <li>✅ Pagination support</li>
            <li>✅ Latest and trending content</li>
            <li>✅ Rich metadata for each item</li>
          </ul>

          <p><strong>Status:</strong> Running on port ${PORT}</p>
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
  console.log(`📌 Use this URL in Stremio to install the add-on\n`);
});

module.exports = app;
