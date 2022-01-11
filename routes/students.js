const Router = require("express");
const students = require("../controllers/students.controller.js");
const router = Router();

router.get("/students", students.findAll);

router.get("/students/:id", students.find);

router.post("/students", students.create);

router.delete("/students/:id", students.destroy);

router.patch("/students/:id", students.modify);

module.exports = router;
