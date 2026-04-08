const express = require("express");
const cors = require("cors");
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

// Root endpoint - Enhanced web interface with movie results and testing tools
app.get("/", async (req, res) => {
  try {
    // Fetch sample movies for display
    const sampleMovies = await getMovies(false, 0, 12); // Get first 12 movies
    const cacheInfo = getCacheInfo();

    // Generate movie grid HTML
    const movieGrid = sampleMovies.slice(0, 12).map(movie => `
      <div class="movie-card">
        <img src="${movie.poster}" alt="${movie.name}" onerror="this.src='https://via.placeholder.com/200x300?text=No+Poster'">
        <div class="movie-info">
          <h4>${movie.name}</h4>
          <p class="year">${movie.year}</p>
          <p class="rating">⭐ ${movie.rating}/10</p>
          <p class="genres">${movie.genres.slice(0, 2).join(', ')}</p>
        </div>
      </div>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>🎬 Tamil Movies & Series Addon</title>
        <style>
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }

          body {
            font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: #fff;
            min-height: 100vh;
          }

          .container {
            max-width: 1200px;
            margin: 0 auto;
            padding: 20px;
          }

          .header {
            text-align: center;
            margin-bottom: 30px;
          }

          .header h1 {
            font-size: 2.5em;
            margin-bottom: 10px;
            text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
          }

          .stats {
            display: flex;
            justify-content: center;
            gap: 20px;
            margin-bottom: 30px;
            flex-wrap: wrap;
          }

          .stat-card {
            background: rgba(255,255,255,0.1);
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            min-width: 150px;
          }

          .stat-number {
            font-size: 2em;
            font-weight: bold;
            color: #ffd700;
          }

          .stat-label {
            font-size: 0.9em;
            opacity: 0.8;
          }

          .section {
            background: rgba(0,0,0,0.3);
            border-radius: 15px;
            padding: 25px;
            margin-bottom: 25px;
          }

          .section h2 {
            color: #ffd700;
            margin-bottom: 20px;
            border-bottom: 2px solid #ffd700;
            padding-bottom: 10px;
          }

          .movie-grid {
            display: grid;
            grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
            gap: 20px;
            margin-bottom: 20px;
          }

          .movie-card {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            overflow: hidden;
            transition: transform 0.3s ease;
            cursor: pointer;
          }

          .movie-card:hover {
            transform: translateY(-5px);
          }

          .movie-card img {
            width: 100%;
            height: 300px;
            object-fit: cover;
          }

          .movie-info {
            padding: 15px;
          }

          .movie-info h4 {
            font-size: 1.1em;
            margin-bottom: 5px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }

          .year {
            color: #ffd700;
            font-weight: bold;
          }

          .rating {
            color: #ff6b6b;
            font-weight: bold;
          }

          .genres {
            font-size: 0.9em;
            opacity: 0.8;
            margin-top: 5px;
          }

          .tools-grid {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            gap: 20px;
          }

          .tool-card {
            background: rgba(255,255,255,0.05);
            border-radius: 10px;
            padding: 20px;
          }

          .tool-card h3 {
            color: #ffd700;
            margin-bottom: 15px;
          }

          .btn {
            background: linear-gradient(45deg, #667eea, #764ba2);
            color: white;
            border: none;
            padding: 10px 20px;
            border-radius: 5px;
            cursor: pointer;
            margin: 5px;
            transition: all 0.3s ease;
            text-decoration: none;
            display: inline-block;
          }

          .btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 5px 15px rgba(0,0,0,0.3);
          }

          .btn-danger {
            background: linear-gradient(45deg, #ff6b6b, #ee5a24);
          }

          .endpoint {
            background: rgba(0,0,0,0.3);
            padding: 10px;
            border-radius: 5px;
            margin: 5px 0;
            font-family: 'Courier New', monospace;
            word-break: break-all;
          }

          .response {
            background: rgba(0,0,0,0.5);
            border: 1px solid #333;
            border-radius: 5px;
            padding: 15px;
            margin-top: 10px;
            max-height: 300px;
            overflow-y: auto;
            font-family: 'Courier New', monospace;
            font-size: 0.9em;
            white-space: pre-wrap;
          }

          .search-box {
            margin-bottom: 20px;
          }

          .search-box input {
            width: 100%;
            padding: 12px;
            border: none;
            border-radius: 25px;
            background: rgba(255,255,255,0.9);
            color: #333;
            font-size: 16px;
          }

          .search-box input::placeholder {
            color: #666;
          }

          .tabs {
            display: flex;
            margin-bottom: 20px;
            border-bottom: 1px solid #333;
          }

          .tab {
            padding: 10px 20px;
            cursor: pointer;
            background: rgba(255,255,255,0.05);
            border-radius: 5px 5px 0 0;
            margin-right: 5px;
          }

          .tab.active {
            background: #ffd700;
            color: #333;
          }

          .tab-content {
            display: none;
          }

          .tab-content.active {
            display: block;
          }

          @media (max-width: 768px) {
            .container {
              padding: 10px;
            }

            .header h1 {
              font-size: 2em;
            }

            .movie-grid {
              grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
            }

            .tools-grid {
              grid-template-columns: 1fr;
            }
          }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎬 Tamil Movies & Series Addon</h1>
            <p>Comprehensive Stremio add-on with ${totalMovies}+ Tamil movies and series</p>
          </div>

          <div class="stats">
            <div class="stat-card">
              <div class="stat-number">${totalMovies}+</div>
              <div class="stat-label">Tamil Movies</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${cacheInfo.cacheExpiry}</div>
              <div class="stat-label">Cache Duration</div>
            </div>
            <div class="stat-card">
              <div class="stat-number">${cacheInfo.lastUpdated}</div>
              <div class="stat-label">Last Updated</div>
            </div>
          </div>

          <div class="section">
            <h2>🎭 Featured Tamil Movies</h2>
            <div class="movie-grid">
              ${movieGrid}
            </div>
            <div style="text-align: center; margin-top: 20px;">
              <a href="#testing" class="btn">View All Movies →</a>
            </div>
          </div>

          <div id="testing" class="section">
            <h2>🛠️ Testing Tools</h2>

            <div class="tabs">
              <div class="tab active" onclick="showTab('manifest')">Manifest</div>
              <div class="tab" onclick="showTab('catalog')">Catalog</div>
              <div class="tab" onclick="showTab('meta')">Meta</div>
              <div class="tab" onclick="showTab('search')">Search</div>
            </div>

            <div id="manifest" class="tab-content active">
              <div class="tools-grid">
                <div class="tool-card">
                  <h3>📋 Manifest Test</h3>
                  <button class="btn" onclick="testEndpoint('/manifest.json')">Test Manifest</button>
                  <div class="endpoint">GET /manifest.json</div>
                  <div id="manifest-response" class="response" style="display: none;"></div>
                </div>
                <div class="tool-card">
                  <h3>🔄 Cache Management</h3>
                  <button class="btn" onclick="clearCache()">Clear TMDB Cache</button>
                  <button class="btn btn-danger" onclick="forceRefresh()">Force Refresh</button>
                  <p>Cache expires every ${cacheInfo.cacheExpiry}</p>
                </div>
              </div>
            </div>

            <div id="catalog" class="tab-content">
              <div class="tools-grid">
                <div class="tool-card">
                  <h3>🎬 Movie Catalogs</h3>
                  <button class="btn" onclick="testEndpoint('/catalog/movie/tamil_movies.json')">All Movies</button>
                  <button class="btn" onclick="testEndpoint('/catalog/movie/tamil_movies_recent.json')">Recent</button>
                  <button class="btn" onclick="testEndpoint('/catalog/movie/tamil_movies_toprated.json')">Top Rated</button>
                  <button class="btn" onclick="testEndpoint('/catalog/movie/tamil_movies_action.json')">Action</button>
                  <div id="catalog-response" class="response" style="display: none;"></div>
                </div>
                <div class="tool-card">
                  <h3>📺 Series Catalogs</h3>
                  <button class="btn" onclick="testEndpoint('/catalog/series/tamil_series.json')">All Series</button>
                  <button class="btn" onclick="testEndpoint('/catalog/series/tamil_series_trending.json')">Trending</button>
                  <div id="series-response" class="response" style="display: none;"></div>
                </div>
              </div>
            </div>

            <div id="meta" class="tab-content">
              <div class="tools-grid">
                <div class="tool-card">
                  <h3>📄 Meta Information</h3>
                  <input type="text" id="meta-id" placeholder="Enter movie/series ID" style="width: 100%; padding: 10px; margin-bottom: 10px; border-radius: 5px; border: none;">
                  <button class="btn" onclick="testMeta()">Get Meta Info</button>
                  <div id="meta-response" class="response" style="display: none;"></div>
                </div>
                <div class="tool-card">
                  <h3>🎯 Sample IDs</h3>
                  <p>Use these sample IDs to test:</p>
                  <div style="font-size: 0.9em;">
                    <p><strong>Movies:</strong> ${sampleMovies.slice(0, 3).map(m => m.id).join(', ')}</p>
                    <p><strong>Series:</strong> Use series IDs from catalog</p>
                  </div>
                </div>
              </div>
            </div>

            <div id="search" class="tab-content">
              <div class="search-box">
                <input type="text" id="search-input" placeholder="Search Tamil movies..." onkeypress="handleSearchKeyPress(event)">
                <button class="btn" onclick="searchMovies()" style="margin-top: 10px;">Search</button>
              </div>
              <div id="search-response" class="response" style="display: none;"></div>
            </div>
          </div>

          <div class="section">
            <h2>📱 Stremio Installation</h2>
            <div class="tool-card">
              <p><strong>Add-on URL:</strong></p>
              <div class="endpoint">${req.protocol}://${req.get('host')}/manifest.json</div>
              <p style="margin-top: 15px;">Copy this URL and paste it in Stremio's add-on section.</p>
              <button class="btn" onclick="copyToClipboard('${req.protocol}://${req.get('host')}/manifest.json')">Copy URL</button>
            </div>
          </div>
        </div>

        <script>
          function showTab(tabName) {
            // Hide all tab contents
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => content.classList.remove('active'));

            // Remove active class from all tabs
            const tabs = document.querySelectorAll('.tab');
            tabs.forEach(tab => tab.classList.remove('active'));

            // Show selected tab
            document.getElementById(tabName).classList.add('active');
            event.target.classList.add('active');
          }

          async function testEndpoint(endpoint) {
            try {
              const response = await fetch(endpoint);
              const data = await response.json();
              const elementId = endpoint.includes('catalog') ? (endpoint.includes('series') ? 'series-response' : 'catalog-response') : 'manifest-response';
              document.getElementById(elementId).style.display = 'block';
              document.getElementById(elementId).textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              console.error('Error:', error);
            }
          }

          async function testMeta() {
            const id = document.getElementById('meta-id').value;
            if (!id) {
              alert('Please enter an ID');
              return;
            }

            // Try movie first, then series
            let endpoint = '/meta/movie/' + id + '.json';
            try {
              const response = await fetch(endpoint);
              if (response.ok) {
                const data = await response.json();
                document.getElementById('meta-response').style.display = 'block';
                document.getElementById('meta-response').textContent = JSON.stringify(data, null, 2);
                return;
              }
            } catch (error) {}

            // Try series
            endpoint = '/meta/series/' + id + '.json';
            try {
              const response = await fetch(endpoint);
              const data = await response.json();
              document.getElementById('meta-response').style.display = 'block';
              document.getElementById('meta-response').textContent = JSON.stringify(data, null, 2);
            } catch (error) {
              document.getElementById('meta-response').style.display = 'block';
              document.getElementById('meta-response').textContent = 'Error: Could not find meta information for ID: ' + id;
            }
          }

          async function searchMovies() {
            const query = document.getElementById('search-input').value;
            if (!query) {
              alert('Please enter a search term');
              return;
            }

            try {
              const response = await fetch('/catalog/movie/tamil_movies.json?genre=' + encodeURIComponent(query));
              const data = await response.json();
              document.getElementById('search-response').style.display = 'block';
              document.getElementById('search-response').textContent = 'Found ' + data.metas.length + ' results:\\n' + JSON.stringify(data, null, 2);
            } catch (error) {
              document.getElementById('search-response').style.display = 'block';
              document.getElementById('search-response').textContent = 'Error: ' + error.message;
            }
          }

          function handleSearchKeyPress(event) {
            if (event.key === 'Enter') {
              searchMovies();
            }
          }

          async function clearCache() {
            if (confirm('Clear TMDB cache? This will force fresh data fetch on next request.')) {
              try {
                const response = await fetch('/admin/clear-cache', { method: 'POST' });
                const result = await response.text();
                alert(result);
                location.reload();
              } catch (error) {
                alert('Error clearing cache: ' + error.message);
              }
            }
          }

          async function forceRefresh() {
            if (confirm('Force refresh TMDB data? This may take a few seconds.')) {
              try {
                const response = await fetch('/admin/force-refresh', { method: 'POST' });
                const result = await response.text();
                alert(result);
                location.reload();
              } catch (error) {
                alert('Error refreshing: ' + error.message);
              }
            }
          }

          function copyToClipboard(text) {
            navigator.clipboard.writeText(text).then(() => {
              alert('URL copied to clipboard!');
            }).catch(() => {
              // Fallback for older browsers
              const textArea = document.createElement('textarea');
              textArea.value = text;
              document.body.appendChild(textArea);
              textArea.select();
              document.execCommand('copy');
              document.body.removeChild(textArea);
              alert('URL copied to clipboard!');
            });
          }

          // Auto-refresh stats every 30 seconds
          setInterval(() => {
            location.reload();
          }, 30000);
        </script>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Web interface error:', error);
    res.status(500).send(`
      <html>
        <body style="background: #333; color: #fff; font-family: Arial; text-align: center; padding: 50px;">
          <h1>🎬 Tamil Movies & Series Addon</h1>
          <p>Error loading web interface. Server may be initializing...</p>
          <p>Try refreshing in a few seconds.</p>
          <button onclick="location.reload()">Refresh</button>
        </body>
      </html>
    `);
  }
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
