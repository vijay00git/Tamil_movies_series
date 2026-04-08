module.exports = {
  id: "org.tamiladdons.movies",
  version: "1.0.0",
  catalogs: [
    {
      type: "movie",
      id: "tamil_movies",
      name: "Tamil Movies",
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime"],
      extra: [
        {
          name: "genre",
          isRequired: false,
          options: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime", "Documentary"]
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
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime"],
      extra: [
        {
          name: "genre",
          isRequired: false,
          options: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime", "Documentary"]
        },
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "movie",
      id: "tamil_movies_recent",
      name: "Latest Tamil Movies",
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime"],
      extra: [
        {
          name: "skip",
          isRequired: false
        }
      ]
    },
    {
      type: "series",
      id: "tamil_series_trending",
      name: "Trending Tamil Series",
      genres: ["Action", "Comedy", "Drama", "Romance", "Thriller", "Horror", "Family", "Historical", "Sci-Fi", "Crime"],
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
  name: "Tamil Movies & Series",
  description: "Comprehensive catalog of Tamil movies and TV series with genre filtering",
  logo: "https://img.icons8.com/?size=512&id=108784&format=png",
  contactEmail: "support@tamiladdons.org"
};
