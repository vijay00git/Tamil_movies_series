#!/usr/bin/env node

/**
 * Quick Start Guide for Tamil Movies & Series Stremio Add-on
 * Run this to test the add-on locally
 */

const http = require("http");
const manifest = require("./manifest");
const { movies, series } = require("./catalog");

// Display banner
function showBanner() {
  console.clear();
  console.log(`
╔═════════════════════════════════════════════════════════════╗
║                                                             ║
║   🎬 TAMIL MOVIES & SERIES - STREMIO ADD-ON               ║
║                                                             ║
║   Quick Start & Testing Guide                             ║
║                                                             ║
╚═════════════════════════════════════════════════════════════╝
  `);
}

// Display catalog info
function showCatalogInfo() {
  console.log("📊 CATALOG INFORMATION");
  console.log("═".repeat(50));
  console.log(`✓ Total Movies: ${movies.length}`);
  console.log(`✓ Total Series: ${series.length}`);
  console.log(`✓ Total Items: ${movies.length + series.length}`);

  // Extract genres
  const allGenres = new Set();
  [...movies, ...series].forEach((item) => {
    item.genres.forEach((genre) => allGenres.add(genre));
  });
  console.log(`✓ Total Genres: ${allGenres.size}`);
  console.log(`\n📌 Genres: ${Array.from(allGenres).sort().join(", ")}\n`);
}

// Display add-on info
function showAddonInfo() {
  console.log("📋 ADD-ON INFORMATION");
  console.log("═".repeat(50));
  console.log(`Name: ${manifest.name}`);
  console.log(`ID: ${manifest.id}`);
  console.log(`Version: ${manifest.version}`);
  console.log(`Description: ${manifest.description}`);
  console.log(`\n`);
}

// Display API endpoints
function showEndpoints() {
  console.log("🌐 API ENDPOINTS");
  console.log("═".repeat(50));
  console.log("\nBase URL: http://localhost:3000\n");

  console.log("Manifest:");
  console.log("  GET /manifest.json");
  console.log("  Returns: Add-on manifest\n");

  console.log("Catalogs:");
  console.log("  GET /catalog/movie/tamil_movies.json");
  console.log("  GET /catalog/movie/tamil_movies_recent.json");
  console.log("  GET /catalog/series/tamil_series.json");
  console.log("  GET /catalog/series/tamil_series_trending.json");
  console.log("  Optional: ?genre=Action&skip=0\n");

  console.log("Metadata:");
  console.log("  GET /meta/movie/{id}.json");
  console.log("  GET /meta/series/{id}.json\n");

  console.log("Streams:");
  console.log("  GET /stream/{type}/{id}.json\n");
}

// Display sample content
function showSampleContent() {
  console.log("🎬 SAMPLE CONTENT");
  console.log("═".repeat(50));

  console.log("\n📽️  Recent Movies:");
  movies.slice(0, 3).forEach((movie) => {
    console.log(`  • ${movie.name} (${movie.year}) - ${movie.genres.join(", ")}`);
  });

  console.log("\n📺 Recent Series:");
  series.slice(0, 3).forEach((s) => {
    console.log(`  • ${s.name} (${s.year}) - ${s.episodesCount} episodes`);
  });
  
  console.log("\n");
}

// Display installation steps
function showInstallationSteps() {
  console.log("🚀 INSTALLATION STEPS");
  console.log("═".repeat(50));
  console.log(`
1. Start the server:
   npm start
   
2. Open Stremio app

3. Go to Add-ons section

4. Click '+' or 'Install from Repository'

5. Paste this URL:
   http://localhost:3000/manifest.json

6. Click Install

7. The add-on will appear in your library!
  `);
}

// Display testing commands
function showTestingCommands() {
  console.log("🧪 TESTING COMMANDS");
  console.log("═".repeat(50));
  console.log(`
# Test manifest
curl http://localhost:3000/manifest.json | jq

# Get all movies
curl http://localhost:3000/catalog/movie/tamil_movies.json | jq '.metas | length'

# Get action movies only
curl "http://localhost:3000/catalog/movie/tamil_movies.json?genre=Action" | jq

# Get movie metadata
curl http://localhost:3000/meta/movie/tamil_movie_1.json | jq

# Get series
curl http://localhost:3000/catalog/series/tamil_series.json | jq '.metas | length'

# Get trending series
curl http://localhost:3000/catalog/series/tamil_series_trending.json | jq

# Test pagination
curl "http://localhost:3000/catalog/movie/tamil_movies.json?skip=10" | jq

  `);
}

// Display features
function showFeatures() {
  console.log("✨ FEATURES");
  console.log("═".repeat(50));
  console.log(`
✓ Comprehensive Tamil movie and series catalog
✓ Multiple content categories and genres
✓ Genre filtering support
✓ Pagination for large result sets
✓ Latest and trending sections
✓ Rich metadata with posters and descriptions
✓ Year and rating information
✓ Series episode details
✓ Easy to extend and customize
✓ Docker support for easy deployment

  `);
}

// Display troubleshooting tips
function showTroubleshooting() {
  console.log("🔧 TROUBLESHOOTING");
  console.log("═".repeat(50));
  console.log(`
Issue: Add-on not showing in Stremio
Solution: Make sure server is running and firewall allows port 3000

Issue: CORS errors
Solution: CORS is already enabled in the server

Issue: Can't connect to localhost:3000
Solution: Check if port 3000 is already in use or blocked by firewall

Issue: Movies/Series not showing
Solution: Refresh the app or restart Stremio

For more help: Check README.md in the project folder

  `);
}

// Main execution
function main() {
  showBanner();
  showAddonInfo();
  showCatalogInfo();
  showFeatures();
  showInstallationSteps();
  showEndpoints();
  showSampleContent();
  showTestingCommands();
  showTroubleshooting();

  console.log("═".repeat(50));
  console.log("Ready to start? Run:  npm start");
  console.log("═".repeat(50) + "\n");
}

// Run if executed directly
if (require.main === module) {
  main();
}

module.exports = { showBanner, showCatalogInfo, showEndpoints };
