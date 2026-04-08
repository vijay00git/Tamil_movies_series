const catalog = {
  movies: [
    // Action Movies
    {
      id: "tamil_movie_1",
      name: "Varisu",
      genres: ["Action", "Family", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Varisu",
      background: "https://via.placeholder.com/1024x576?text=Varisu",
      description: "An action-packed family drama about a man discovering his true heritage",
      year: 2023,
      rating: 7.2
    },
    {
      id: "tamil_movie_2",
      name: "Master",
      genres: ["Action", "Crime", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Master",
      background: "https://via.placeholder.com/1024x576?text=Master",
      description: "An intense thriller between a teacher and a student",
      year: 2021,
      rating: 8.1
    },
    {
      id: "tamil_movie_3",
      name: "Pushpa: The Rise",
      genres: ["Action", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Pushpa",
      background: "https://via.placeholder.com/1024x576?text=Pushpa",
      description: "The rise of a smuggler in the red sanders business",
      year: 2021,
      rating: 7.8
    },
    {
      id: "tamil_movie_4",
      name: "Beast",
      genres: ["Action", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Beast",
      background: "https://via.placeholder.com/1024x576?text=Beast",
      description: "Super soldier on a covert mission caught in a hostage situation",
      year: 2022,
      rating: 6.9
    },
    {
      id: "tamil_movie_5",
      name: "Jailer",
      genres: ["Action", "Drama", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Jailer",
      background: "https://via.placeholder.com/1024x576?text=Jailer",
      description: "A retired jailer seeks revenge against criminals",
      year: 2023,
      rating: 7.5
    },
    // Comedy Movies
    {
      id: "tamil_movie_6",
      name: "Anjathe",
      genres: ["Comedy", "Family", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Anjathe",
      background: "https://via.placeholder.com/1024x576?text=Anjathe",
      description: "A delightful family comedy about unexpected relationships",
      year: 2022,
      rating: 7.3
    },
    {
      id: "tamil_movie_7",
      name: "Sarpatta Parambarai",
      genres: ["Drama", "Sport", "Action"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Sarpatta",
      background: "https://via.placeholder.com/1024x576?text=Sarpatta",
      description: "A tale of boxers and their journey through the sport",
      year: 2021,
      rating: 7.4
    },
    // Romance Movies
    {
      id: "tamil_movie_8",
      name: "Patta",
      genres: ["Romance", "Comedy", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Patta",
      background: "https://via.placeholder.com/1024x576?text=Patta",
      description: "A contemporary take on modern relationships",
      year: 2022,
      rating: 6.8
    },
    // Historical/Drama
    {
      id: "tamil_movie_9",
      name: "Ponniyin Selvan: I",
      genres: ["Historical", "Action", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Ponniyin Selvan",
      background: "https://via.placeholder.com/1024x576?text=Ponniyin Selvan",
      description: "Epic historical saga set in the Chola dynasty",
      year: 2022,
      rating: 7.6
    },
    {
      id: "tamil_movie_10",
      name: "Karnan",
      genres: ["Drama", "Action", "Historical"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Karnan",
      background: "https://via.placeholder.com/1024x576?text=Karnan",
      description: "A powerful drama about fighting against injustice",
      year: 2021,
      rating: 7.7
    },
    // Thriller/Horror
    {
      id: "tamil_movie_11",
      name: "Sardar",
      genres: ["Thriller", "Crime"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Sardar",
      background: "https://via.placeholder.com/1024x576?text=Sardar",
      description: "A gripping crime thriller about power and revenge",
      year: 2022,
      rating: 6.5
    },
    {
      id: "tamil_movie_12",
      name: "Pichaikkaran: The Investor",
      genres: ["Thriller", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Pichaikkaran",
      background: "https://via.placeholder.com/1024x576?text=Pichaikkaran",
      description: "An investor uncovers a web of corporate crimes",
      year: 2023,
      rating: 7.1
    },
    // Sci-Fi
    {
      id: "tamil_movie_13",
      name: "Jagame Thandhiram",
      genres: ["Action", "Sci-Fi", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Jagame Thandhiram",
      background: "https://via.placeholder.com/1024x576?text=Jagame Thandhiram",
      description: "A gangster navigates different countries and cultures",
      year: 2021,
      rating: 7.2
    }
  ],
  series: [
    // Drama Series
    {
      id: "tamil_series_1",
      name: "Andhaghaaram",
      genres: ["Drama", "Thriller", "Psychological"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Andhaghaaram",
      background: "https://via.placeholder.com/1024x576?text=Andhaghaaram",
      description: "A complex psychological thriller series",
      year: 2020,
      rating: 8.2,
      seasons: 1,
      episodesCount: 7
    },
    {
      id: "tamil_series_2",
      name: "Suzhal: The Vortex",
      genres: ["Crime", "Thriller", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Suzhal",
      background: "https://via.placeholder.com/1024x576?text=Suzhal",
      description: "A crime thriller series investigating mysterious disappearances",
      year: 2022,
      rating: 7.9,
      seasons: 1,
      episodesCount: 9
    },
    {
      id: "tamil_series_3",
      name: "Sillukkuvarupatti Singam",
      genres: ["Comedy", "Drama", "Family"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Sillukkuvarupatti",
      background: "https://via.placeholder.com/1024x576?text=Sillukkuvarupatti",
      description: "A light-hearted family comedy series",
      year: 2021,
      rating: 7.5,
      seasons: 1,
      episodesCount: 10
    },
    // Action Series
    {
      id: "tamil_series_4",
      name: "Jai Bhim",
      genres: ["Action", "Drama", "Thriller"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Jai Bhim",
      background: "https://via.placeholder.com/1024x576?text=Jai Bhim",
      description: "An intense legal drama series",
      year: 2021,
      rating: 8.5,
      seasons: 1,
      episodesCount: 1
    },
    {
      id: "tamil_series_5",
      name: "Taanaji",
      genres: ["Action", "War", "Historical"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Taanaji",
      background: "https://via.placeholder.com/1024x576?text=Taanaji",
      description: "A historical action series about warriors",
      year: 2023,
      rating: 7.3,
      seasons: 1,
      episodesCount: 5
    },
    // Romantic Series
    {
      id: "tamil_series_6",
      name: "Paava Kadhaigal",
      genres: ["Romance", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Paava Kadhaigal",
      background: "https://via.placeholder.com/1024x576?text=Paava Kadhaigal",
      description: "Anthology series featuring romantic tales",
      year: 2021,
      rating: 7.6,
      seasons: 1,
      episodesCount: 4
    },
    // Family Series
    {
      id: "tamil_series_7",
      name: "Navarasa",
      genres: ["Drama", "Family", "Entertainment"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Navarasa",
      background: "https://via.placeholder.com/1024x576?text=Navarasa",
      description: "An anthology of tales exploring human emotions",
      year: 2021,
      rating: 7.8,
      seasons: 1,
      episodesCount: 9
    },
    // Thriller Series
    {
      id: "tamil_series_8",
      name: "Thiravam",
      genres: ["Thriller", "Crime", "Mystery"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Thiravam",
      background: "https://via.placeholder.com/1024x576?text=Thiravam",
      description: "A gripping mystery thriller series",
      year: 2022,
      rating: 7.4,
      seasons: 1,
      episodesCount: 6
    },
    {
      id: "tamil_series_9",
      name: "Jai Bhim Part 2",
      genres: ["Thriller", "Drama", "Legal"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Jai Bhim 2",
      background: "https://via.placeholder.com/1024x576?text=Jai Bhim 2",
      description: "Continuation of the legal thriller",
      year: 2023,
      rating: 8.3,
      seasons: 1,
      episodesCount: 2
    }
  ]
};

module.exports = catalog;
