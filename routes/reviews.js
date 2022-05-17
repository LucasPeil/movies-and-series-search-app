const express = require ("express");
const router = express.Router();
const review = require( "../controllers/review"); 

const {isLoggedIn,isReviewAuthor, validateReview, validateEditReview} = require("../middlewares")
const catchAsync = require("../errors/AsyncErrors")

router.route("/:showId/review").post(isLoggedIn, validateReview, catchAsync(review.createReview))

router.route("/:showId/review/:reviewId")
.delete(isLoggedIn,isReviewAuthor, catchAsync(review.deleteReview))
.put(isLoggedIn,isReviewAuthor,validateEditReview,catchAsync(review.editReview))

router.route("/:reviewId/edit").get(catchAsync(review.renderEditReview))

module.exports = router