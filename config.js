/**
 * Configuration for Tamil Movies & Series Add-on
 */

module.exports = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    host: process.env.HOST || "0.0.0.0",
    env: process.env.NODE_ENV || "development"
  },

  // Add-on configuration
  addon: {
    id: "org.tamiladdons.movies",
    name: "Tamil Movies & Series",
    version: "1.0.0",
    description: "Comprehensive catalog of Tamil movies and TV series",
    author: "Tamil Add-ons",
    logo: "https://img.icons8.com/?size=512&id=108784&format=png",
    contactEmail: "support@tamiladdons.org"
  },

  // Catalog configuration
  catalog: {
    pageSize: 20,
    defaultGenre: "All",
    genres: [
      "Action",
      "Comedy",
      "Drama",
      "Romance",
      "Thriller",
      "Horror",
      "Family",
      "Historical",
      "Sci-Fi",
      "Crime",
      "Documentary",
      "Adventure",
      "Animation",
      "Biography",
      "Mystery"
    ],
    types: ["movie", "series"]
  },

  // Features
  features: {
    genreFiltering: true,
    pagination: true,
    search: true,
    recommendations: true,
    streaming: false // Can be enabled with stream providers
  },

  // Content rating categories
  ratings: {
    U: "Unrestricted Public Exhibition",
    UA: "Unrestricted with parental guidance",
    A: "Restricted to adults",
    S: "Specialized films",
    UNRATED: "Not rated"
  },

  // API rate limiting
  rateLimit: {
    enabled: false,
    windowMs: 15 * 60 * 1000, // 15 minutes
    maxRequests: 100
  },

  // Cache configuration
  cache: {
    enabled: true,
    ttl: 3600 // 1 hour
  },

  // Logging
  logging: {
    level: process.env.LOG_LEVEL || "info",
    format: "json"
  }
};
