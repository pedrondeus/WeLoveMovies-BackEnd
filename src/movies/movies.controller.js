const service = require("./movies.service");

async function list(req, res, next){
  const {is_showing} = req.query;
  if(is_showing)
    {
      return res.json({data: await service.listTrue()})
    }
    let result = await service.list();
    res.json({ data: result});
}

async function movieExists(req, res, next) {
  const movie = await service.read(req.params.movieId);
  console.log("movie is ", movie);
  if (movie) {
    res.locals.movie = movie;
    return next();
  }
  next({ status: 404, message: `movie cannot be found.` });
}

async function read(req, res, next){
    const movie = res.locals.movie;
  console.log("read function movies is");
    res.json({ data: movie })

}
//middleware function to return error: movie cannot be found

async function readTheaters(req, res, next){
   const {movieId} = req.params;
  const result = await service.readTheaters(movieId);
    res.json({ data: result })
}

async function readReviews(req, res, next){
  const movieId  = res.locals.movie.movie_id;
  const result = await service.readReviews(movieId);
  res.json({ data: result })
}

module.exports = {
    list,
    read:[movieExists, read],
    readTheaters: [movieExists,readTheaters],
    readReviews: [movieExists,readReviews],
}