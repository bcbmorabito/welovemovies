const { Router } = require("express");
const controller = require('./reviews.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');

Router
    .route('/:reviewId')
    .delete(controller.delete)
    .all(methodNotAllowed);

Router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = Router;