const mapProperties = require("../utils/map-properties");
const knex = require("../db/connection");

const addCritic = mapProperties({
  c_critic_id: "critic.critic_id",
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
  c_created_at: "critic.created_at",
  c_updated_at: "critic.updated_at",
})

function read(review_id){
  return knex("reviews")
    .join("critics as c", "c.critic_id", "reviews.critic_id")
    .select("reviews.*",
      "c.critic_id as c_critic_id",
      "c.preferred_name",
      "c.surname",
      "c.organization_name",
      "c.created_at as c_created_at",
      "c.updated_at as c_updated_at")
    .where({ "review_id": review_id })
    .first()
    .then(addCritic)
}

function update(updatedReview){
    return knex("reviews")
        .select("*")
        .where({"review_id": updatedReview.review_id })
        .update(updatedReview, "*")
        .then(updatedReview => updatedReview[0])
}

function destroy(reviewId){
    return knex("reviews")
        .where({"review_id": reviewId }).del()
}

module.exports = {
  read,  
  update,
  destroy,
}