require("dotenv").config();
const express = require("express");
const router = require("./routes/students.js");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 4000;

//Connect to mongodb
const { DB_URI } = process.env;

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}.`);
    });
  })
  .catch((err) => console.log(err));

app.use(express.json());

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "http://localhost:3000");
  res.header("Access-Control-Allow-Methods", "GET, POST, DELETE, PATCH");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, Accept, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers"
  );
  next();
});

app.use("/api", router);

// /api/students . stu router
// /subjects // subj router

app.get("/api", (req, res) => res.send("Welcome to my API!"));

app.get("*", (req, res) =>
  res.status(404).send("There is no content at this route")
);
