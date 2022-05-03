const { Router } = require("express");
const controller = require('./theaters.controller');
const methodNotAllowed = require('../errors/methodNotAllowed');


Router
    .route('/')
    .get(controller.list)
    .all(methodNotAllowed);

module.exports = Router;