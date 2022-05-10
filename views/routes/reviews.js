const express = require ("express");
const router = express.Router();
const review = require( "../controllers/review"); 

const {isLoggedIn,isReviewAuthor} = require("../middlewares")
const catchAsync = require("../errors/AsyncErrors")

router.route("/:movieId/review").post(isLoggedIn, catchAsync(review.createReview))

router.route("/:id/review/:reviewId")
.delete(isLoggedIn,isReviewAuthor, catchAsync(review.deleteReview))
.put(isLoggedIn,isReviewAuthor,catchAsync(review.editReview))

router.route("/:reviewId/edit").get(catchAsync(review.renderEditReview))

module.exports = router