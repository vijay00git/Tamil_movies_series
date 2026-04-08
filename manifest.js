module.exports = {
  id: "org.tamiladdons.movies",
  version: "2.1.0",
  catalogs: [
    // ===== MAIN CATALOGS =====
    {
      type: "movie",
      id: "tamil_movies",
      name: "Tamil Movies",
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime", "Sport"],
      extra: [
        {
          name: "genre",
          isRequired: false,
          options: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime", "Documentary", "Sport"]
        },
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "series",
      id: "tamil_series",
      name: "Tamil Series",
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Psychological", "Crime"],
      extra: [
        {
          name: "genre",
          isRequired: false,
          options: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Psychological", "Crime"]
        },
        {
          name: "skip",
          isRequired: false
        }
      ]
    },

    // ===== SPECIAL COLLECTIONS =====
    {
      type: "movie",
      id: "tamil_movies_recent",
      name: "Latest Tamil Movies",
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_classics",
      name: "Classic Tamil Movies (80s-90s)",
      genres: ["Drama", "Romance", "Historical", "Crime"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_toprated",
      name: "Top Rated Tamil Movies",
      genres: ["Action", "Drama", "Thriller", "Crime", "Romance"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },

    // ===== DUBBED CONTENT =====
    {
      type: "movie",
      id: "tamil_dubbed_movies",
      name: "Dubbed Tamil Movies",
      genres: ["Action", "Adventure", "Crime", "Drama", "Thriller"],
      extra: [
        {
          name: "genre",
          isRequired: false,
          options: ["Action", "Adventure", "Crime", "Drama", "Thriller", "Sci-Fi"]
        },
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "series",
      id: "tamil_dubbed_series",
      name: "Dubbed Tamil Series",
      genres: ["Action", "Crime", "Drama", "Thriller"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },

    // ===== GENRE-WISE MOVIES =====
    {
      type: "movie",
      id: "tamil_movies_action",
      name: "Tamil Action Movies",
      genres: ["Action"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_drama",
      name: "Tamil Drama Movies",
      genres: ["Drama"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_romance",
      name: "Tamil Romance Movies",
      genres: ["Romance"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_comedy",
      name: "Tamil Comedy Movies",
      genres: ["Comedy"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_thriller",
      name: "Tamil Thriller Movies",
      genres: ["Thriller"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },

    // ===== SERIES COLLECTIONS =====
    {
      type: "series",
      id: "tamil_series_trending",
      name: "Trending Tamil Series",
      genres: ["Thriller", "Drama", "Crime"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    }
  ],
  resources: ["catalog", "meta"],
  types: ["movie", "series"],
  name: "Tamil Movies & Series Catalog",
  description: "Comprehensive catalog of Tamil movies and TV series with genre filtering, classics, top-rated content, and dubbed versions",
  logo: "https://img.icons8.com/?size=512&id=108784&format=png",
  contactEmail: "support@tamiladdons.org"
};
