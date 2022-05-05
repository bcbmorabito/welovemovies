const service = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

// middleware

// reads movie id from params, validates, and finds the movie with matching id
async function paramsValidation(req, res, next) {
  const { movieId } = req.params;
  const match = await service.read(Number(movieId));
  if (match.length === 0 || !movieId)
    return next({
      status: 404,
      message: `movieId: ${movieId} does not exist in the database`,
    });
  res.locals.movie = match[0];
  next();
};

// handlers

/*
   if is_showing query, return movies that are showing
   otherwise, list all movies
*/
async function list(req, res) {
  const { is_showing } = req.query;
  const data = is_showing
    ? await (await service.listShowing()).splice(0,15)
    : await service.list();

  res.status(200).json({ data: data });
}

// returns movie with matching id
async function read(req, res) {
  res.status(200).json({ data: res.locals.movie });
}

// lists and iterates over reviews to include critic information
async function listReviews(req, res) {
  const movieId = res.locals.movie.movie_id;
  const reviews = await service.listReviews(movieId);
  const allReviews = [];
  for (let i = 0; i < reviews.length; i++) {
    const review = reviews[i];
    const critic = await service.getCritics(review.critic_id);
    review.critic = critic[0];
    allReviews.push(review);
  }
  res.status(200).json({ data: allReviews });
}

// list theaters with matching movieId
async function listTheaters(req, res) {
  const movieId = res.locals.movie.movie_id;
  const result = await service.listTheaters(movieId);
  res.status(200).json({ data: result });
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  read: [asyncErrorBoundary(paramsValidation), asyncErrorBoundary(read)],
  listReviews: [
    asyncErrorBoundary(paramsValidation),
    asyncErrorBoundary(listReviews),
  ],
  listTheaters: [
    asyncErrorBoundary(paramsValidation),
    asyncErrorBoundary(listTheaters),
  ],
};