const mapProperties = require("../utils/map-properties");
const knex = require("../db/connection");

function list(movieId){
    return knex("movies")
        .select("*");
}

function listTrue(){
    return knex("movies")
        .join("movies_theaters", "movies_theaters.movie_id", "movies.movie_id")
        .distinct("movies.*")
        .where({"is_showing": true})
}

function read(movieId){
    return knex("movies")
        .select("*")
        .where({"movie_id": movieId})
        .first()
}

function readTheaters(movieId){
     return knex("theaters as t")
    .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
    .select("t.*", "mt.movie_id", "mt.is_showing")
    .where({ "mt.movie_id": movieId });
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
  })  

function readReviews(movieId){
  return knex("reviews as r")
       .join("critics as c", "c.critic_id", "r.critic_id")
       .select("r.*", "c.*")
       .where({ "r.movie_id": movieId })
       .then(reviews => reviews.map(review => addCritic(review)));
}


module.exports = {
    list,
    listTrue,
    read,
    readTheaters,
    readReviews,
};