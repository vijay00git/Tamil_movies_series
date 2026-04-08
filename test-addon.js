/**
 * Advanced testing and demo script for the Tamil Add-on
 * This script demonstrates all available features and API endpoints
 */

const http = require("http");

const BASE_URL = "http://localhost:3000";

// Colors for console output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m"
};

// HTTP request helper
function makeRequest(path) {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const client = url.protocol === "https:" ? require("https") : http;

    client
      .get(url, (res) => {
        let data = "";
        res.on("data", (chunk) => {
          data += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(data));
          } catch (e) {
            resolve(data);
          }
        });
      })
      .on("error", reject);
  });
}

// Format and display results
function displayResult(test, data) {
  console.log(
    `\n${colors.cyan}Test: ${test}${colors.reset}`
  );
  console.log(`${colors.bright}Result:${colors.reset}`);
  if (Array.isArray(data)) {
    console.log(`  Items: ${data.length}`);
    if (data.length > 0 && data[0].name) {
      data.slice(0, 3).forEach((item, i) => {
        console.log(
          `  ${i + 1}. ${item.name} ${item.year ? `(${item.year})` : ""}`
        );
      });
    }
  } else {
    console.log(JSON.stringify(data, null, 2).substring(0, 500));
  }
  console.log("─".repeat(60));
}

// Main test suite
async function runTests() {
  console.clear();
  console.log(
    `${colors.bright}${colors.magenta}
╔════════════════════════════════════════════════════════════╗
║                                                            ║
║   TAMIL MOVIES & SERIES ADD-ON - TEST SUITE               ║
║                                                            ║
║   This script tests all API endpoints and features        ║
║                                                            ║
╚════════════════════════════════════════════════════════════╝
${colors.reset}`
  );

  // Check if server is running
  try {
    console.log(
      `${colors.yellow}Checking server connection...${colors.reset}`
    );
    const response = await makeRequest("/manifest.json");
    console.log(
      `${colors.green}✓ Server is running on ${BASE_URL}${colors.reset}\n`
    );
  } catch (e) {
    console.error(
      `${colors.red}✗ Could not connect to server at ${BASE_URL}${colors.reset}`
    );
    console.error("Make sure to run: npm start");
    process.exit(1);
  }

  // Test Suite
  const tests = [
    {
      name: "Get Manifest",
      path: "/manifest.json",
      description: "Fetch add-on manifest with all configurations"
    },
    {
      name: "All Tamil Movies",
      path: "/catalog/movie/tamil_movies.json",
      description: "Get all Tamil movies in catalog"
    },
    {
      name: "Recent Movies",
      path: "/catalog/movie/tamil_movies_recent.json",
      description: "Get latest Tamil movies sorted by year"
    },
    {
      name: "Action Movies",
      path: "/catalog/movie/tamil_movies.json?genre=Action",
      description: "Filter movies by Action genre"
    },
    {
      name: "Drama Movies",
      path: "/catalog/movie/tamil_movies.json?genre=Drama",
      description: "Filter movies by Drama genre"
    },
    {
      name: "All Tamil Series",
      path: "/catalog/series/tamil_series.json",
      description: "Get all Tamil TV series"
    },
    {
      name: "Trending Series",
      path: "/catalog/series/tamil_series_trending.json",
      description: "Get trending Tamil series"
    },
    {
      name: "Comedy Series",
      path: "/catalog/series/tamil_series.json?genre=Comedy",
      description: "Filter series by Comedy genre"
    },
    {
      name: "Movie Metadata",
      path: "/meta/movie/tamil_movie_1.json",
      description: "Get detailed metadata for a movie"
    },
    {
      name: "Series Metadata",
      path: "/meta/series/tamil_series_1.json",
      description: "Get detailed metadata for a series"
    },
    {
      name: "Movie Pagination",
      path: "/catalog/movie/tamil_movies.json?skip=5",
      description: "Test pagination with skip parameter"
    }
  ];

  let successCount = 0;
  let failCount = 0;

  // Run each test
  for (const test of tests) {
    try {
      console.log(
        `${colors.bright}${colors.blue}Testing: ${test.name}${colors.reset}`
      );
      console.log(`${colors.cyan}${test.description}${colors.reset}`);
      console.log(`Path: ${test.path}`);

      const result = await makeRequest(test.path);

      if (result) {
        console.log(`${colors.green}✓ Success${colors.reset}`);

        if (result.metas) {
          console.log(`  Items returned: ${result.metas.length}`);
          if (result.metas.length > 0) {
            const first = result.metas[0];
            console.log(`  First item: ${first.name}`);
          }
        } else if (result.meta) {
          console.log(`  Item: ${result.meta.name}`);
          console.log(`  Year: ${result.meta.year}`);
          console.log(`  Rating: ${result.meta.imdbRating}`);
        } else if (result.name) {
          console.log(`  Name: ${result.name}`);
          console.log(`  Version: ${result.version}`);
        }
        successCount++;
      } else {
        console.log(`${colors.yellow}⚠ No data returned${colors.reset}`);
        failCount++;
      }
    } catch (error) {
      console.log(`${colors.red}✗ Failed: ${error.message}${colors.reset}`);
      failCount++;
    }

    console.log("─".repeat(60));
  }

  // Summary
  console.log(
    `\n${colors.bright}${colors.magenta}TEST SUMMARY${colors.reset}`
  );
  console.log(`${colors.green}Passed: ${successCount}${colors.reset}`);
  console.log(`${colors.yellow}Failed: ${failCount}${colors.reset}`);
  console.log(`Total: ${tests.length}`);

  if (failCount === 0) {
    console.log(
      `\n${colors.green}${colors.bright}All tests passed! ✓${colors.reset}`
    );
    console.log("Add-on is ready for integration with Stremio!");
  } else {
    console.log(`\n${colors.yellow}Some tests failed. Check the output above.${colors.reset}`);
  }

  console.log("\n" + "═".repeat(60) + "\n");
}

// Run tests
if (require.main === module) {
  runTests().catch(console.error);
}

module.exports = { makeRequest, displayResult, runTests };
