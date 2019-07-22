const movieModel = require('../models/movies');
module.exports = {
  getById: (req, res, next) => {
    console.log(req.body);
    movieModel.findById(req.params.movieId, (err, movieInfo) => {
      if (err) {
        next(err);
      } else {
        res.json({ status: "success", message: "Movie found", data: { movies: movieInfo } });
      }
    });
  },
  getAll: (req, res, next) => {
    movieModel.find({}, (err, movies) => {
      if (err) {
        next(err);
      } else {
        const moviesList = movies.filter((movie) => (movie.userId.toString() === req.body.userId))
        res.json({ status: "success", message: "Movies list found", data: { movies: moviesList } });
      }
    });
  },
  updateById: (req, res, next) => {
    movieModel.findByIdAndUpdate(req.params.movieId, {
      name: req.body.name,
      released_on: req.body.released_on,
      disk: req.body.disk,
      rating: req.body.rating,
      isWatched: req.body.isWatched,
      genres: req.body.genres,
    }, (err, movieInfo) => {
      if (err)
        next(err);
      else {
        movieModel.find({}, (err, movies) => {
          if (err) {
            next(err);
          } else {
            const moviesList = movies.filter((movie) => (movie.userId.toString() === req.body.userId))
            res.json({ status: "success", message: "Movie updated successfully", data: { movies: moviesList } });
          }
        });
      }
    });
  },
  deleteById: (req, res, next) => {
    movieModel.findByIdAndRemove(req.params.movieId, (err, movieInfo) => {
      if (err)
        next(err);
      else {
        movieModel.find({}, (err, movies) => {
          if (err) {
            next(err);
          } else {
            const moviesList = movies.filter((movie) => (movie.userId.toString() === req.body.userId))
            res.json({ status: "success", message: "Movie deleted successfully", data: { movies: moviesList } });
          }
        });
      }
    });
  },
  create: (req, res, next) => {
    movieModel.create({
      name: req.body.name,
      released_on: req.body.released_on,
      disk: req.body.disk,
      genres: req.body.genres,
      userId: req.body.userId,
    }, (err, result) => {
      if (err)
        next(err);
      else {
        movieModel.find({}, (err, movies) => {
          if (err) {
            next(err);
          } else {
            const moviesList = movies.filter((movie) => (movie.userId.toString() === req.body.userId))
            res.json({ status: "success", message: "Movie added successfully", data: { movies: moviesList } });
          }
        });
      }
    });
  },
}
