use movie_streaming_app;

// collection users
db.users.insertMany([
  { user_id: 1, name: "Harish", email: "harish@example.com", country: "India" },{ user_id: 2, name: "John", email: "john@example.com", country: "USA" },{ user_id: 3, name: "Sara", email: "sara@example.com", country: "UK" },{ user_id: 4, name: "Meena", email: "meena@example.com", country: "India" },{ user_id: 5, name: "Alex", email: "alex@example.com", country: "Canada" }]);

// collection movies
db.movies.insertMany([
  { movie_id: 101, title: "Dream Beyond Code", genre: "Sci-Fi", release_year: 2022, duration: 120 },{ movie_id: 102, title: "Heartbeats", genre: "Romance", release_year: 2019, duration: 95 },{ movie_id: 103, title: "Mystery Lane", genre: "Thriller", release_year: 2021, duration: 105 },{ movie_id: 104, title: "Laugh Out Loud", genre: "Comedy", release_year: 2018, duration: 90 },{ movie_id: 105, title: "The Last Samurai", genre: "Action", release_year: 2020, duration: 130 },{ movie_id: 106, title: "AI Reboot", genre: "Sci-Fi", release_year: 2023, duration: 110 }]);

// collection watch_history
db.watch_history.insertMany([
  { watch_id: 1, user_id: 1, movie_id: 101, watched_on: new Date("2024-06-01"), watch_time: 120 },  { watch_id: 2, user_id: 2, movie_id: 102, watched_on: new Date("2024-06-03"), watch_time: 95 },  { watch_id: 3, user_id: 1, movie_id: 103, watched_on: new Date("2024-06-05"), watch_time: 100 }, { watch_id: 4, user_id: 3, movie_id: 104, watched_on: new Date("2024-06-07"), watch_time: 90 },  { watch_id: 5, user_id: 4, movie_id: 105, watched_on: new Date("2024-06-08"), watch_time: 130 },  { watch_id: 6, user_id: 5, movie_id: 106, watched_on: new Date("2024-06-10"), watch_time: 110 },  { watch_id: 7, user_id: 1, movie_id: 101, watched_on: new Date("2024-06-11"), watch_time: 110 },  { watch_id: 8, user_id: 2, movie_id: 101, watched_on: new Date("2024-06-12"), watch_time: 115 }]);


// 1. Find all movies with duration > 100 minutes
db.movies.find({duration:{$gt:100}});

// 2. List users from 'India'
db.users.find({country:"India"});

// 3. Get all movies released after 2020
db.movies.find({release_year:{$gt:2020}});

// 4. Show full watch history: user name, movie title, watch time
db.watch_history.aggregate([
  {
    $lookup:{
      from:"users",
      localField:"user_id",
      foreignField:"user_id",
      as:"user"
    }
  },
  {$unwind:"$user"},
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },
  {$unwind:"$movie"},
  {
    $project:{
      _id:0,
      user_name:"$user.name",
      movie_title:"$movie.title",
      watch_time:1
    }
  }
]);

// 5. List each genre and number of times movies in that genre were watched
db.watch_history.aggregate([
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },
  {$unwind:"$movie"},
  {
    $group:{
      _id:"$movie.genre",
      watch_count:{$sum:1}
    }
  }
]);

// 6. Display total watch time per user
db.watch_history.aggregate([
  {
    $group:{
      _id:"$user_id",
      total_watch_time:{$sum:"$watch_time"}
    }
  },
  {
    $lookup:{
      from:"users",
      localField:"_id",
      foreignField:"user_id",
      as:"user"
    }
  },
  {$unwind:"$user"},
  {
    $project:{
      _id:0,
      user_name:"$user.name",
      total_watch_time:1
    }
  }
]);

// 7. Find which movie has been watched the most (by count)
db.watch_history.aggregate([
  {
    $group:{
      _id:"$movie_id",
      watch_count:{$sum:1}
    }
  },
  {$sort:{watch_count:-1}},
  {$limit:1},
  {
    $lookup:{
      from:"movies",
      localField:"_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },
  {$unwind:"$movie"},
  {
    $project:{
      movie_title:"$movie.title",
      watch_count:1
    }
  }
]);

// 8. Identify users who have watched more than 2 movies
db.watch_history.aggregate([
  {
    $group:{
      _id:"$user_id",
      movies_watched:{$addToSet:"$movie_id"}
    }
  },
  {
    $project:{
      movie_count:{$size:"$movies_watched"}
    }
  },
  { $match:{movie_count:{$gt:2}}},
  {
    $lookup:{
      from:"users",
      localField:"_id",
      foreignField:"user_id",
      as:"user"
    }
  },
  {$unwind:"$user"},
  {
    $project:{
      user_name:"$user.name",
      movie_count:1
    }
  }
]);

// 9. Show users who watched the same movie more than once
db.watch_history.aggregate([
  {
    $group:{
      _id:{user_id:"$user_id",movie_id:"$movie_id"},
      watch_count:{$sum:1}
    }
  },
  {$match:{watch_count:{$gt:1}}},
  {
    $lookup:{
      from:"users",
      localField:"_id.user_id",
      foreignField:"user_id",
      as:"user"
    }
  },
  {$unwind:"$user"},
  {
    $lookup:{
      from:"movies",
      localField:"_id.movie_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },
  {$unwind:"$movie"},
  {
    $project:{
      user_name:"$user.name",
      movie_title:"$movie.title",
      watch_count:1
    }
  }
]);

// 10. Calculate percentage of each movie watched (watch_time/duration * 100)
db.watch_history.aggregate([
  {
    $lookup:{
      from:"movies",
      localField:"movie_id",
      foreignField:"movie_id",
      as:"movie"
    }
  },
  {$unwind:"$movie"},
  {
    $project:{
      user_id:1,
      movie_title:"$movie.title",
      percent_watched:{
        $multiply:[
          {$divide:["$watch_time","$movie.duration"]},
          100
        ]
      }
    }
  }
]);