const catalog = {
  movies: [
    // ====== CLASSIC TAMIL MOVIES (80s - 90s) ======
    {
      id: "tamil_movie_classic_1",
      name: "Nayagan",
      genres: ["Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Nayagan",
      background: "https://via.placeholder.com/1024x576?text=Nayagan",
      description: "Masterpiece about a gangster's life and struggles - cult classic",
      year: 1987,
      rating: 8.9,
      era: "Classic"
    },
    {
      id: "tamil_movie_classic_2",
      name: "Mouna Ragam",
      genres: ["Romance", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=MounaRagam",
      background: "https://via.placeholder.com/1024x576?text=Mouna",
      description: "Romantic drama exploring modern relationships",
      year: 1986,
      rating: 8.5
    },
    {
      id: "tamil_movie_classic_3",
      name: "Padikkathavan",
      genres: ["Comedy", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Padikkathavan",
      background: "https://via.placeholder.com/1024x576?text=Padikkathavan",
      description: "Classic comedy-drama from the 80s",
      year: 1987,
      rating: 8.0
    },

    // ====== TOP-RATED MOVIES (2000s - 2010s) ======
    {
      id: "tamil_movie_toprated_1",
      name: "Chandramukhi",
      genres: ["Horror", "Drama", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Chandramukhi",
      background: "https://via.placeholder.com/1024x576?text=Chandramukhi",
      description: "Horror-thriller about a possessed dancer in an old palace",
      year: 2005,
      rating: 8.2
    },
    {
      id: "tamil_movie_toprated_2",
      name: "Ghajini",
      genres: ["Action", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Ghajini",
      background: "https://via.placeholder.com/1024x576?text=Ghajini",
      description: "Revenge thriller with memory loss twist - blockbuster",
      year: 2005,
      rating: 7.9
    },
    {
      id: "tamil_movie_toprated_3",
      name: "Kaavalan",
      genres: ["Comedy", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Kaavalan",
      background: "https://via.placeholder.com/1024x576?text=Kaavalan",
      description: "Hilarious comedy about a reformed criminal",
      year: 2011,
      rating: 7.6
    },
    {
      id: "tamil_movie_toprated_4",
      name: "Oh Kadhal Kanmani",
      genres: ["Romance", "Comedy"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=OhKadhal",
      background: "https://via.placeholder.com/1024x576?text=OhKadhal",
      description: "Modern romantic comedy with witty dialogues",
      year: 2015,
      rating: 7.3
    },
    {
      id: "tamil_movie_toprated_5",
      name: "Asuran",
      genres: ["Drama", "Action", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Asuran",
      background: "https://via.placeholder.com/1024x576?text=Asuran",
      description: "Emotional father-son drama with powerful performances",
      year: 2019,
      rating: 8.3
    },

    // ====== RECENT TOP-RATED MOVIES (2020-2023) ======
    {
      id: "tamil_movie_recent_1",
      name: "Master",
      genres: ["Action", "Crime", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Master",
      background: "https://via.placeholder.com/1024x576?text=Master",
      description: "Intense cat-and-mouse thriller between teacher and student",
      year: 2021,
      rating: 8.1
    },
    {
      id: "tamil_movie_recent_2",
      name: "Karnan",
      genres: ["Drama", "Action", "Historical"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Karnan",
      background: "https://via.placeholder.com/1024x576?text=Karnan",
      description: "Powerful drama about fighting against injustice",
      year: 2021,
      rating: 7.7
    },
    {
      id: "tamil_movie_recent_3",
      name: "Ponniyin Selvan: I",
      genres: ["Historical", "Action", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=PS1",
      background: "https://via.placeholder.com/1024x576?text=PS1",
      description: "Epic historical saga from the Chola dynasty",
      year: 2022,
      rating: 7.6
    },
    {
      id: "tamil_movie_recent_4",
      name: "Vikram",
      genres: ["Action", "Crime", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Vikram",
      background: "https://via.placeholder.com/1024x576?text=Vikram",
      description: "High-octane crime action thriller",
      year: 2022,
      rating: 7.9
    },
    {
      id: "tamil_movie_recent_5",
      name: "Jailer",
      genres: ["Action", "Drama", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Jailer",
      background: "https://via.placeholder.com/1024x576?text=Jailer",
      description: "Retired jailer seeks revenge against criminals",
      year: 2023,
      rating: 7.5
    },
    {
      id: "tamil_movie_recent_6",
      name: "Varisu",
      genres: ["Action", "Family", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Varisu",
      background: "https://via.placeholder.com/1024x576?text=Varisu",
      description: "Action-packed family drama about heritage",
      year: 2023,
      rating: 7.2
    },

    // ====== ACTION MOVIES ======
    {
      id: "tamil_movie_action_1",
      name: "Pushpa: The Rise",
      genres: ["Action", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Pushpa",
      background: "https://via.placeholder.com/1024x576?text=Pushpa",
      description: "Rise of a smuggler in the red sanders business",
      year: 2021,
      rating: 7.8
    },
    {
      id: "tamil_movie_action_2",
      name: "Beast",
      genres: ["Action", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Beast",
      background: "https://via.placeholder.com/1024x576?text=Beast",
      description: "Super soldier on covert mission in hostage situation",
      year: 2022,
      rating: 6.9
    },
    {
      id: "tamil_movie_action_3",
      name: "Darbar",
      genres: ["Action", "Thriller", "Crime"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Darbar",
      background: "https://via.placeholder.com/1024x576?text=Darbar",
      description: "Intense action thriller about a police commissioner",
      year: 2020,
      rating: 6.8
    },
    {
      id: "tamil_movie_action_4",
      name: "Thuppakki",
      genres: ["Action", "Comedy", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Thuppakki",
      background: "https://via.placeholder.com/1024x576?text=Thuppakki",
      description: "Action-comedy about a vigilante",
      year: 2012,
      rating: 7.4
    },

    // ====== DRAMA MOVIES ======
    {
      id: "tamil_movie_drama_1",
      name: "Sarpatta Parambarai",
      genres: ["Drama", "Sport", "Action"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Sarpatta",
      background: "https://via.placeholder.com/1024x576?text=Sarpatta",
      description: "Inspiring tale of boxers and their journey",
      year: 2021,
      rating: 7.4
    },
    {
      id: "tamil_movie_drama_2",
      name: "Viswasam",
      genres: ["Drama", "Action", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Viswasam",
      background: "https://via.placeholder.com/1024x576?text=Viswasam",
      description: "Family drama about trust and relationships",
      year: 2019,
      rating: 7.2
    },

    // ====== ROMANTIC MOVIES ======
    {
      id: "tamil_movie_romance_1",
      name: "Patta",
      genres: ["Romance", "Comedy", "Family"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Patta",
      background: "https://via.placeholder.com/1024x576?text=Patta",
      description: "Contemporary take on modern relationships",
      year: 2022,
      rating: 6.8
    },

    // ====== COMEDY MOVIES ======
    {
      id: "tamil_movie_comedy_1",
      name: "Anjathe",
      genres: ["Comedy", "Family", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Anjathe",
      background: "https://via.placeholder.com/1024x576?text=Anjathe",
      description: "Delightful family comedy about relationships",
      year: 2022,
      rating: 7.3
    },
    {
      id: "tamil_movie_comedy_2",
      name: "Naanum Rowdydhaan",
      genres: ["Comedy", "Action"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Naanum",
      background: "https://via.placeholder.com/1024x576?text=Naanum",
      description: "Fun-filled action comedy adventure",
      year: 2015,
      rating: 7.1
    },

    // ====== THRILLER MOVIES ======
    {
      id: "tamil_movie_thriller_1",
      name: "Sardar",
      genres: ["Thriller", "Crime"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Sardar",
      background: "https://via.placeholder.com/1024x576?text=Sardar",
      description: "Gripping crime thriller about power and revenge",
      year: 2022,
      rating: 6.5
    },
    {
      id: "tamil_movie_thriller_2",
      name: "Pichaikkaran: The Investor",
      genres: ["Thriller", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Pichaikka",
      background: "https://via.placeholder.com/1024x576?text=Pichaikka",
      description: "Investor uncovers web of corporate crimes",
      year: 2023,
      rating: 7.1
    },

    // ====== DUBBED TAMIL MOVIES ======
    {
      id: "tamil_dubbed_1",
      name: "Baahubali: The Beginning (Tamil Dubbed)",
      genres: ["Action", "Adventure", "Fantasy"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Baahubali1",
      background: "https://via.placeholder.com/1024x576?text=Baahubali1",
      description: "Epic action-adventure dubbed in Tamil",
      year: 2015,
      rating: 8.0,
      language: "Dubbed Tamil"
    },
    {
      id: "tamil_dubbed_2",
      name: "Baahubali 2: The Conclusion (Tamil Dubbed)",
      genres: ["Action", "Adventure", "Fantasy"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Baahubali2",
      background: "https://via.placeholder.com/1024x576?text=Baahubali2",
      description: "Epic conclusion dubbed in Tamil",
      year: 2017,
      rating: 8.2,
      language: "Dubbed Tamil"
    },
    {
      id: "tamil_dubbed_3",
      name: "RRR (Tamil Dubbed)",
      genres: ["Action", "Adventure"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=RRR",
      background: "https://via.placeholder.com/1024x576?text=RRR",
      description: "High-octane action film dubbed in Tamil",
      year: 2022,
      rating: 7.8,
      language: "Dubbed Tamil"
    },
    {
      id: "tamil_dubbed_4",
      name: "Kantara (Tamil Dubbed)",
      genres: ["Action", "Drama", "Thriller"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Kantara",
      background: "https://via.placeholder.com/1024x576?text=Kantara",
      description: "Intense action-thriller dubbed in Tamil",
      year: 2022,
      rating: 8.3,
      language: "Dubbed Tamil"
    },
    {
      id: "tamil_dubbed_5",
      name: "Sooryavanshi (Tamil Dubbed)",
      genres: ["Action", "Crime", "Drama"],
      type: "movie",
      poster: "https://via.placeholder.com/260x390?text=Sooryavanshi",
      background: "https://via.placeholder.com/1024x576?text=Sooryavanshi",
      description: "Police action thriller dubbed in Tamil",
      year: 2021,
      rating: 7.5,
      language: "Dubbed Tamil"
    }
  ],

  series: [
    // ====== TOP-RATED SERIES ======
    {
      id: "tamil_series_1",
      name: "Andhaghaaram",
      genres: ["Drama", "Thriller", "Psychological"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Andhaghaaram",
      background: "https://via.placeholder.com/1024x576?text=Andhaghaaram",
      description: "Complex psychological thriller series - highly acclaimed",
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
      description: "Crime thriller investigating mysterious disappearances",
      year: 2022,
      rating: 7.9,
      seasons: 1,
      episodesCount: 9
    },
    {
      id: "tamil_series_3",
      name: "Jai Bhim",
      genres: ["Action", "Drama", "Thriller"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=JaiBhim",
      background: "https://via.placeholder.com/1024x576?text=JaiBhim",
      description: "Intense legal drama series - award-winning",
      year: 2021,
      rating: 8.5,
      seasons: 1,
      episodesCount: 1
    },

    // ====== DRAMA SERIES ======
    {
      id: "tamil_series_drama_1",
      name: "Sillukkuvarupatti Singam",
      genres: ["Comedy", "Drama", "Family"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Sillukkuva",
      background: "https://via.placeholder.com/1024x576?text=Sillukkuva",
      description: "Light-hearted family comedy series",
      year: 2021,
      rating: 7.5,
      seasons: 1,
      episodesCount: 10
    },
    {
      id: "tamil_series_drama_2",
      name: "Paava Kadhaigal",
      genres: ["Romance", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=PavaKadhai",
      background: "https://via.placeholder.com/1024x576?text=PavaKadhai",
      description: "Anthology series with romantic and dramatic tales",
      year: 2021,
      rating: 7.6,
      seasons: 1,
      episodesCount: 4
    },
    {
      id: "tamil_series_drama_3",
      name: "Navarasa",
      genres: ["Drama", "Family", "Entertainment"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Navarasa",
      background: "https://via.placeholder.com/1024x576?text=Navarasa",
      description: "Anthology exploring human emotions and relationships",
      year: 2021,
      rating: 7.8,
      seasons: 1,
      episodesCount: 9
    },

    // ====== THRILLER SERIES ======
    {
      id: "tamil_series_thriller_1",
      name: "Thiravam",
      genres: ["Thriller", "Crime", "Mystery"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Thiravam",
      background: "https://via.placeholder.com/1024x576?text=Thiravam",
      description: "Gripping mystery thriller series",
      year: 2022,
      rating: 7.4,
      seasons: 1,
      episodesCount: 6
    },
    {
      id: "tamil_series_thriller_2",
      name: "Rajamahal",
      genres: ["Horror", "Thriller", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Rajamahal",
      background: "https://via.placeholder.com/1024x576?text=Rajamahal",
      description: "Haunted palace horror series",
      year: 2021,
      rating: 7.2,
      seasons: 1,
      episodesCount: 10
    },

    // ====== DUBBED TAMIL SERIES ======
    {
      id: "tamil_dubbed_series_1",
      name: "The Family Man (Tamil Dubbed)",
      genres: ["Action", "Thriller", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=FamilyMan",
      background: "https://via.placeholder.com/1024x576?text=FamilyMan",
      description: "Espionage thriller series dubbed in Tamil",
      year: 2019,
      rating: 8.4,
      seasons: 2,
      episodesCount: 20,
      language: "Dubbed Tamil"
    },
    {
      id: "tamil_dubbed_series_2",
      name: "Sacred Games (Tamil Dubbed)",
      genres: ["Crime", "Thriller", "Drama"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=SacGames",
      background: "https://via.placeholder.com/1024x576?text=SacGames",
      description: "Crime thriller series dubbed in Tamil",
      year: 2018,
      rating: 8.7,
      seasons: 2,
      episodesCount: 16,
      language: "Dubbed Tamil"
    },
    {
      id: "tamil_dubbed_series_3",
      name: "Mirzapur (Tamil Dubbed)",
      genres: ["Crime", "Drama", "Action"],
      type: "series",
      poster: "https://via.placeholder.com/260x390?text=Mirzapur",
      background: "https://via.placeholder.com/1024x576?text=Mirzapur",
      description: "Dark crime drama series dubbed in Tamil",
      year: 2018,
      rating: 8.5,
      seasons: 2,
      episodesCount: 20,
      language: "Dubbed Tamil"
    }
  ]
};

module.exports = catalog;
