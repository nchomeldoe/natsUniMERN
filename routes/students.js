const Router = require("express");
const students = require("../controllers/students.controller.js");
const studentsRouter = Router();

studentsRouter.get("/", students.findAll);

studentsRouter.get("/:id", students.find);

studentsRouter.post("/", students.create);

studentsRouter.delete("/:id", students.destroy);

studentsRouter.patch("/:id", students.modify);

module.exports = studentsRouter;
