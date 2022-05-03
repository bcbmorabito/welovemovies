const { Router } = require("express");
const controller = require("./movies.controller");
const methodNotAllowed = require("../errors/methodNotAllowed");

Router
    .route("/:movieId/theaters")
    .get(controller.read)
    .all(methodNotAllowed);

Router
    .route("/:movieId/reviews")
    .get(controller.read)
    .all(methodNotAllowed);

Router
    .route("/:movieId")
    .get(controller.read)
    .all(methodNotAllowed);

Router
    .route("/")
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = Router;
