
const express = require ("express");
const router = express.Router();

const movie = require( "../controllers/movies"); 
const {isLoggedIn,isAuthor} = require("../middlewares")
const catchAsync = require("../errors/AsyncErrors")

router.route("/").get(movie.index)

router.route("/:movieId/add/").post( isLoggedIn, catchAsync(movie.addShowList)) // ajustar essa rota para incluir list
router.route("/list").get(isLoggedIn, catchAsync(movie.renderShowList))

router.route("/:id").get(movie.showDetails)

router.route("/:movieId").delete(catchAsync(movie.deleteShowOnList))

module.exports = router





