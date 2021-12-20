const db = require("../models");
const {
  logger
} = require("../config/config");


async function createMovie(req, res, next) {

  try {
    const {
      title,
      releaseYear,
      genres,
      duration,
      cast,
      crew
    } = req.body;

    const newMovie = await db.Movie.create({
      title: title,
      releaseYear: releaseYear,
      genres: genres,
      duration: duration,
      cast: cast,
      crew: crew
    });

    res.status(201).send({
      success: true,
      data: {
        newMovie
      },
    });
  } catch (err) {
    next(err);
  }
}

async function getMovies(req, res, next) {
  try {
    const movies = await db.Movie.find().limit().lean().exec();
    res.status(200).send({
      quantity: movies.length, // To check the quantity of movies within the array of movies
      data: movies
    });
  } catch (err) {
    next(err);
  }
}

async function getSingleMovie(req, res, next) {
  try {
    const movieId = req.params['movieId'];
    // console.log(movieId);
    // const data = req.body;

    const getMovie = await db.Movie.findOne({
        _id: movieId,
        // }, {
        //   stats: 0,
        //   __v: 0
      })
      .select({
        title: 1,
        releaseYear: 1
      })
      .populate({
        path: "cast",
        select: {
          firstName: 1,
          lastName: 1
        },
      })
      .lean().exec();
    res.status(200).send({
      data: getMovie
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
}

async function updateMovie(req, res, next) {

  const {
    movieId: movieId
  } = req.params;

  try {
    const updatedMovie = await db.Movie.findByIdAndUpdate(movieId, req.body, {
      new: true,
    });

    res.status(203).send({
      data: updatedMovie
    });
  } catch (err) {
    next(err);
  }
}

async function deleteMovie(req, res, next) {
  try {
    const movieId = req.params['movieId'];
    // console.log(movieId);

    const deleteMovie = await db.Movie.findOneAndDelete({
      _id: movieId
    });
    // console.log(deleteMovie);
    if (deleteMovie.ok === 1 && deleteMovie.deletedCount === 1) {
      res.status(204).send({
        data: deleteMovie
      });
    } else {
      res.status(500).send({
        err: "Movie not removed"
      });
    }
  } catch (err) {
    next(err);
  }
}

module.exports = {
  createMovie: createMovie,
  getMovies: getMovies,
  getSingleMovie: getSingleMovie,
  updateMovie: updateMovie,
  deleteMovie: deleteMovie,
};