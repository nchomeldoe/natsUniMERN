const Router = require("express");
const subjects = require("../controllers/subjects.controller.js");
const subjectsRouter = Router();

subjectsRouter.get("/", subjects.findAll);

subjectsRouter.post("/", subjects.create);

subjectsRouter.delete("/:name", subjects.destroy);

module.exports = subjectsRouter;
