const service = require("./reviews.service")

async function reviewExists(req, res, next) {
    const review = await service.read(req.params.reviewId);
    console.log("review is ", review);
    if (review) {
      res.locals.review = review;
      return next();
    }
    next({ status: 404, message: `Review cannot be found.` });
  }

async function update(req, res, next){
    let updatedReview = {
        ...req.body.data,
        review_id:res.locals.review.review_id
    }
    const result = await service.update(updatedReview)
    const data = await service.read(res.locals.review.review_id)
    res.json({ data })
}

async function destroy(req, res){
    await service.destroy(res.locals.review.review_id)
    res.sendStatus(204);
}

module.exports = {
    update: [reviewExists, update],
    delete: [reviewExists, destroy],
}