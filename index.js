require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const studentsRouter = require("./routes/students.js");
const subjectsRouter = require("./routes/subjects.js");

const { DB_URI, PORT, NODE_ENV } = process.env;
const app = express();
const THIS_PORT = PORT || 4000;

//Connect to mongodb

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log("mongo err:", err));

// app
app.use(cors());
app.use(express.json());

app.use("/api/students", studentsRouter);
app.use("/api/subjects", subjectsRouter);

if (NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
  });
}

app.listen(THIS_PORT, () => {
  console.log(`Server is running on port ${THIS_PORT}.`);
});
