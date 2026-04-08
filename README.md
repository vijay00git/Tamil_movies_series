# Tamil Movies & Series - Stremio Add-on

A comprehensive Stremio add-on that provides a rich catalog of Tamil movies and TV series with proper categorization, genre filtering, and metadata.

## 🎯 Features

- ✅ **Complete Tamil Catalog**: Extensive collection of Tamil movies and series
- ✅ **Multiple Genres**: Action, Comedy, Drama, Romance, Thriller, Horror, Family, Historical, Sci-Fi, Crime, Documentary
- ✅ **Genre Filtering**: Filter content by your favorite genres
- ✅ **Recent & Trending**: Latest movies and trending series sections
- ✅ **Pagination Support**: Browse through catalog with pagination
- ✅ **Rich Metadata**: Detailed information for each movie/series including:
  - Posters and backgrounds
  - Descriptions
  - Release year
  - Ratings
  - Genre tags
  - Episode information (for series)

## 📦 Installation

### Prerequisites
- Node.js 14.0 or higher
- Stremio App

### Setup

1. **Clone or navigate to the project**:
```bash
cd Tamil_movies_series
```

2. **Install dependencies**:
```bash
npm install
```

3. **Start the server**:
```bash
npm start
```

The server will start on `http://localhost:3000`

### Add to Stremio

1. Open **Stremio** app
2. Go to **Add-ons** section
3. Click **+ Install from Repository**
4. Enter the manifest URL: `http://localhost:3000/manifest.json`
5. Click **Install**

## 📊 Available Catalogs

### Movies
- **Tamil Movies** (`/catalog/movie/tamil_movies.json`)
  - All Tamil movies with genre filtering
  - Supports: Action, Comedy, Drama, Romance, Thriller, Horror, Family, Historical, Sci-Fi, Crime, Documentary

- **Latest Tamil Movies** (`/catalog/movie/tamil_movies_recent.json`)
  - Most recent Tamil movies
  - Sorted by year (newest first)

### Series
- **Tamil Series** (`/catalog/series/tamil_series.json`)
  - All Tamil TV series with genre filtering
  - Same genre support as movies

- **Trending Tamil Series** (`/catalog/series/tamil_series_trending.json`)
  - Trending Tamil series
  - Sorted by year (newest first)

## 🎬 Content Categories

### By Genre
- **Action**: High-octane thrillers and action-packed dramas
- **Comedy**: Light-hearted comedies and humorous tales
- **Drama**: Intense dramatic stories
- **Romance**: Romantic tales and love stories
- **Thriller**: Suspenseful and intense thrillers
- **Horror**: Horror and psychological thrillers
- **Family**: Family-friendly content
- **Historical**: Historical epics and period dramas
- **Sci-Fi**: Science fiction and futuristic tales
- **Crime**: Crime dramas and criminal investigations
- **Documentary**: Educational and documentary content

## 🔌 API Endpoints

### Manifest
```
GET /manifest.json
```
Returns the add-on manifest with all catalog definitions

### Catalog
```
GET /catalog/{type}/{id}.json?genre={genre}&skip={skip}
```

Parameters:
- `type`: `movie` or `series`
- `id`: `tamil_movies`, `tamil_movies_recent`, `tamil_series`, or `tamil_series_trending`
- `genre` (optional): Filter by genre (e.g., `Action`, `Comedy`)
- `skip` (optional): Pagination offset (default: 0)

Examples:
- All movies: `/catalog/movie/tamil_movies.json`
- Action movies: `/catalog/movie/tamil_movies.json?genre=Action`
- Paginated: `/catalog/movie/tamil_movies.json?skip=20`
- Drama series: `/catalog/series/tamil_series.json?genre=Drama`

### Metadata
```
GET /meta/{type}/{id}.json
```

Returns detailed metadata for a specific movie or series

### Streams
```
GET /stream/{type}/{id}.json
```

Returns available streams (can be extended for stream providers)

## 📝 Example Requests

### Get all Tamil movies
```bash
curl http://localhost:3000/catalog/movie/tamil_movies.json
```

### Get action movies only
```bash
curl "http://localhost:3000/catalog/movie/tamil_movies.json?genre=Action"
```

### Get a specific movie's metadata
```bash
curl http://localhost:3000/meta/movie/tamil_movie_1.json
```

### Get trending series
```bash
curl http://localhost:3000/catalog/series/tamil_series_trending.json
```

## 📂 Project Structure

```
Tamil_movies_series/
├── server.js           # Main Express server
├── manifest.js         # Stremio add-on manifest
├── catalog.js          # Movie and series catalog data
├── package.json        # Node.js dependencies
└── README.md          # This file
```

## 🔧 Configuration

### Port
Default port is `3000`. To change:
```bash
PORT=8080 npm start
```

### Adding More Content
Edit `catalog.js` and add new movies/series:

```javascript
{
  id: "unique_movie_id",
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

## 🚀 Deployment

### Docker (Optional)
Create a `Dockerfile`:
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 3000
CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t tamil-addon .
docker run -p 3000:3000 tamil-addon
```

### Environment Variables
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Set to `production` for production deployments

## 💡 Tips

1. **For Local Testing**: Run the server locally and use `http://localhost:3000/manifest.json`
2. **For Remote Access**: Deploy on a server with a public IP or use services like ngrok
3. **Add Streams**: Extend the `/stream` endpoint to integrate with actual stream providers
4. **Custom Branding**: Update the logo and name in `manifest.js`

## 📋 Supported Content Types

- Movies
- TV Series
- Documentary
- Stand-up Comedy

## 🤝 Contributing

To add more content:
1. Edit `catalog.js`
2. Add items with proper metadata
3. Restart the server
4. Refresh in Stremio

## ⚙️ Development

### Start in development mode
```bash
npm run dev
```

### Debug mode
```bash
DEBUG=* npm start
```

## 📄 License

MIT License - Feel free to use and modify

## 📧 Support

For issues or suggestions, please create an issue in the repository.

---

**Enjoy your Tamil movies and series on Stremio!** 🎬🍿