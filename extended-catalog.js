/**
 * Extended catalog with more Tamil movies and series
 * Add this to catalog.js to expand the collection
 */

const extendedCatalog = {
  additionalMovies: [
    // More Action Movies
    {
      id: "tamil_movie_14",
      name: "Darbar",
      genres: ["Action", "Thriller", "Crime"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Darbar",
      background: "https://via.placeholder.com/1024x576?text=Darbar",
      description: "An intense action thriller about a police commissioner",
      year: 2020,
      rating: 6.8
    },
    {
      id: "tamil_movie_15",
      name: "Bigil",
      genres: ["Action", "Sport", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Bigil",
      background: "https://via.placeholder.com/1024x576?text=Bigil",
      description: "A sports action drama about football",
      year: 2019,
      rating: 7.1
    },
    {
      id: "tamil_movie_16",
      name: "Mersal",
      genres: ["Action", "Thriller", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Mersal",
      background: "https://via.placeholder.com/1024x576?text=Mersal",
      description: "A triple role action thriller",
      year: 2017,
      rating: 7.3
    },
    {
      id: "tamil_movie_17",
      name: "Ghajini",
      genres: ["Action", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Ghajini",
      background: "https://via.placeholder.com/1024x576?text=Ghajini",
      description: "A revenge thriller with memory loss twist",
      year: 2005,
      rating: 7.9
    },
    {
      id: "tamil_movie_18",
      name: "Vikram",
      genres: ["Action", "Crime", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Vikram",
      background: "https://via.placeholder.com/1024x576?text=Vikram",
      description: "A high-octane crime action thriller",
      year: 2022,
      rating: 7.9
    },
    // More Drama Movies
    {
      id: "tamil_movie_19",
      name: "Viswasam",
      genres: ["Drama", "Action", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Viswasam",
      background: "https://via.placeholder.com/1024x576?text=Viswasam",
      description: "A family drama about trust and relationships",
      year: 2019,
      rating: 7.2
    },
    {
      id: "tamil_movie_20",
      name: "Asuran",
      genres: ["Drama", "Action", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Asuran",
      background: "https://via.placeholder.com/1024x576?text=Asuran",
      description: "A emotional father-son drama",
      year: 2019,
      rating: 8.3
    },
    // Comedy-Drama Movies
    {
      id: "tamil_movie_21",
      name: "Thuppakki",
      genres: ["Action", "Comedy", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Thuppakki",
      background: "https://via.placeholder.com/1024x576?text=Thuppakki",
      description: "An action comedy about a vigilante",
      year: 2012,
      rating: 7.4
    },
    {
      id: "tamil_movie_22",
      name: "Kaavalan",
      genres: ["Comedy", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Kaavalan",
      background: "https://via.placeholder.com/1024x576?text=Kaavalan",
      description: "A hilarious comedy about a reformed criminal",
      year: 2011,
      rating: 7.6
    }
  ],
  
  additionalSeries: [
    {
      id: "tamil_series_10",
      name: "Puthandu Ponmagale",
      genres: ["Drama", "Family", "Comedy"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Puthandu",
      background: "https://via.placeholder.com/1024x576?text=Puthandu",
      description: "A family drama series",
      year: 2022,
      rating: 7.0,
      seasons: 1,
      episodesCount: 8
    },
    {
      id: "tamil_series_11",
      name: "Taanaji Season 2",
      genres: ["Action", "War", "Historical"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Taanaji 2",
      background: "https://via.placeholder.com/1024x576?text=Taanaji 2",
      description: "Continuation of the historical action series",
      year: 2023,
      rating: 7.5,
      seasons: 1,
      episodesCount: 6
    },
    {
      id: "tamil_series_12",
      name: "Kaaveri",
      genres: ["Drama", "Mystery", "Thriller"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Kaaveri",
      background: "https://via.placeholder.com/1024x576?text=Kaaveri",
      description: "A gripping mystery thriller series",
      year: 2023,
      rating: 8.0,
      seasons: 1,
      episodesCount: 7
    },
    {
      id: "tamil_series_13",
      name: "Rajamahal",
      genres: ["Horror", "Thriller", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Rajamahal",
      background: "https://via.placeholder.com/1024x576?text=Rajamahal",
      description: "A haunted palace horror series",
      year: 2021,
      rating: 7.2,
      seasons: 1,
      episodesCount: 10
    }
  ]
};

module.exports = extendedCatalog;
