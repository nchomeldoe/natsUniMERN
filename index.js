require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors");

const studentsRouter = require("./routes/students.js");
const subjectsRouter = require("./routes/subjects.js");
console.log("****************", process.env);
const app = express();
const port = process.env.PORT || 4000;

//Connect to mongodb
const { DB_URI } = process.env;
console.log("DB_URI", DB_URI);

mongoose
  .connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB has been connected"))
  .catch((err) => console.log("mongo err:", err));

app.use(cors());
app.use(express.json());

app.use("/api/students", studentsRouter);
app.use("/api/subjects", subjectsRouter);
app.use(express.static(path.join(__dirname, "client", "build")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}.`);
});
