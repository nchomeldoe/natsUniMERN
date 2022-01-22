const Subject = require("../models/subject.js");

const findAll = (req, res) => {
  Subject.find()
    .then((results) => {
      const sortedResults = results.sort((a, b) => (a.name > b.name ? 1 : -1));
      res.status(200).send(sortedResults);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};

const create = (req, res) => {
  const subject = new Subject(req.body);
  subject
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      if (
        err.errors.name &&
        err.errors.name.properties.message === "Name already exists"
      ) {
        res
          .status(409)
          .send({ message: "Sorry, that subject already exists!" });
      } else {
        res
          .status(500)
          .send({ message: "Sorry, there was an error! Please try again." });
      }
    });
};

const destroy = (req, res) => {
  Subject.findByIdAndDelete(req.params.id)
    .then(() => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};

module.exports = { findAll, create, destroy };
