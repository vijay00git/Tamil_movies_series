# GETTING STARTED GUIDE - Tamil Movies & Series Stremio Add-on

## What You've Got

A complete, production-ready Stremio add-on that catalogs Tamil movies and TV series with:
- ✅ 20+ movies and 10+ series pre-loaded
- ✅ Full genre categorization (11 genres)
- ✅ Advanced filtering capabilities
- ✅ Pagination support
- ✅ Search functionality
- ✅ Complete Stremio API compliance

## 📁 Project Structure Explained

```
Tamil_movies_series/
├── server.js              # Main Express server - Handles API requests
├── manifest.js            # Stremio add-on manifest - Defines add-on capabilities
├── catalog.js             # Movie & series database - All content is here
├── config.js              # Configuration settings
├── utils.js               # Utility functions for catalog management
├── extended-catalog.js    # Additional movies/series to add
├── package.json           # Node.js dependencies
├── test-addon.js          # Comprehensive test suite
├── quickstart.js          # Interactive setup guide
├── README.md              # Full documentation
├── Dockerfile             # Docker containerization
├── docker-compose.yml     # Docker Compose config
└── .gitignore             # Git ignore rules
```

## 🚀 Quick Start (3 Steps)

### Step 1: Install Dependencies
```bash
cd Tamil_movies_series
npm install
```

### Step 2: Start the Server
```bash
npm start
```

You should see:
```
✅ Tamil Movies & Series Addon is running!
📺 Access it at: http://localhost:3000
📋 Manifest URL: http://localhost:3000/manifest.json
```

### Step 3: Add to Stremio
1. Open **Stremio** application
2. Click on **Add-ons** (usually on the left sidebar)
3. Click **➕ Install from Repository** or similar option
4. Paste this URL: `http://localhost:3000/manifest.json`
5. Click **Install**
6. The add-on will appear in your library!

## 📊 Browsing the Catalog

After installation, you'll see:

**Indian Movies Section:**
- Tamil Movies (all, with genre filter)
- Latest Tamil Movies
- By Genre filters (Action, Comedy, Drama, etc.)

**Indian Series Section:**
- Tamil Series (all, with genre filter)
- Trending Tamil Series
- By Genre filters

## 🎮 Interactive Commands

### View Quick Start Info
```bash
npm run quickstart
```

Shows:
- Catalog statistics
- Available endpoints
- Sample content list
- Installation steps
- API testing commands

### Run Full Test Suite
```bash
npm test
```

Tests all API endpoints and shows:
- Connection status
- Manifest validation
- Catalog retrieval
- Genre filtering
- Metadata endpoints
- Pagination testing

## 🔧 Common Operations

### Add a New Movie

Edit `catalog.js` and add to the `movies` array:

```javascript
{
  id: "tamil_movie_YOUR_ID",
  name: "Movie Name",
  genres: ["Action", "Drama"],
  type: "movie",
  poster: "https://url-to-poster.jpg",
  background: "https://url-to-background.jpg",
  description: "Movie description",
  year: 2023,
  rating: 7.5
}
```

### Add a New Series

Edit `catalog.js` and add to the `series` array:

```javascript
{
  id: "tamil_series_YOUR_ID",
  name: "Series Name",
  genres: ["Comedy", "Family"],
  type: "series",
  poster: "https://url-to-poster.jpg",
  background: "https://url-to-background.jpg",
  description: "Series description",
  year: 2023,
  rating: 7.8,
  seasons: 1,
  episodesCount: 10
}
```

### Use Helper Functions

In `utils.js`, there are utility functions:

```javascript
// Create a movie easily
const movie = createMovie(
  "Movie Name",
  ["Action", "Drama"],
  2023,
  "Description",
  7.5
);

// Get statistics
const stats = getCatalogStats(movies, series);

// Search content
const results = searchContent(allItems, "query");

// Get random recommendations
const recommend = getRandomItems(items, 5);
```

## 🌐 API Reference

### Get All Movies
```
GET /catalog/movie/tamil_movies.json
```

### Filter by Genre
```
GET /catalog/movie/tamil_movies.json?genre=Action
GET /catalog/series/tamil_series.json?genre=Drama
```

### Pagination
```
GET /catalog/movie/tamil_movies.json?skip=20
```

### Get Details
```
GET /meta/movie/tamil_movie_1.json
GET /meta/series/tamil_series_1.json
```

## 🐳 Docker Deployment

### Quick Docker Start
```bash
docker compose up
```

### Or Manual Docker Build
```bash
docker build -t tamil-addon .
docker run -p 3000:3000 tamil-addon
```

## ⚙️ Configuration

Edit `config.js` to modify:
- Server port
- Page size
- Generic handling
- Rate limiting
- Logging level
- Caching

## 🐛 Troubleshooting

| Issue | Solution |
|-------|----------|
| Add-on not showing in Stremio | Ensure server is running on port 3000 |
| "Connection refused" error | Check if another app is using port 3000 |
| Movies/series not displaying | Try refreshing Stremio or restarting the app |
| CORS errors | CORS is enabled by default, check browser console |
| Port 3000 already in use | `lsof -i :3000` to find the process, then kill it or use different port |

## 📈 Going Further

### Integrate with Real Streams
Edit `server.js` `/stream` endpoint to connect with actual video providers

### Add Authentication
Implement user authentication in `server.js`

### Scale the Catalog
Use `extended-catalog.js` as a template to add hundreds more items

### Deploy Online
Use services like Heroku, AWS, DigitalOcean to host it publicly:
```bash
export PORT=3000
npm start
```

### Add More Features
- User wishlist/bookmarks
- Watch history
- Recommendations algorithm
- Search with Elasticsearch
- Multiple language support

## 📝 Notes

- This add-on uses placeholder images from `via.placeholder.com`
  - Replace these with actual movie/series posters
- Stream endpoints return empty (extend with real providers)
- All metadata is hardcoded in `catalog.js` (can integrate with database)
- CORS enabled for local testing (restrict in production)

## 🎯 Next Steps

1. **Verify Installation**: Run `npm test`
2. **Browse Content**: Open Stremio and check the catalog
3. **Add Content**: Edit `catalog.js` with real movies/series
4. **Add Streams**: Implement real video providers in `/stream` endpoint
5. **Deploy**: Host on a server for remote access
6. **Share**: Other users can install your public add-on!

## 📞 Support Resources

- **Stremio Add-on Documentation**: https://stremio.github.io/docs/
- **Add-on Examples**: https://github.com/Stremio/stremio-addons
- **Community Forum**: https://forums.stremio.com/

---

**Happy streaming!** 🎬🍿

For detailed technical documentation, see [README.md](README.md)
