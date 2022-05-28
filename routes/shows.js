
const express = require ("express");
const router = express.Router();

const show = require( "../controllers/shows"); 
const {isLoggedIn,isAuthor} = require("../middlewares")
const catchAsync = require("../errors/AsyncErrors")

router.route("/").get(show.index)

router.route("/:showId/add/").post( isLoggedIn, catchAsync(show.addShowList)) 
router.route("/list").get(isLoggedIn, catchAsync(show.renderShowList))

router.route("/:id").get(show.showDetails)

router.route("/:showId").delete(catchAsync(show.deleteShowOnList))

module.exports = router





