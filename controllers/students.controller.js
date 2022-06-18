const Student = require("../models/student.js");

const findAll = (req, res) => {
  Student.find()
    .then((results) => {
      const sortedResults = results.sort((a, b) =>
        `${a.lastName.toLowerCase()} ${a.firstName.toLowerCase()}` >
        `${b.lastName.toLowerCase()} ${b.firstName.toLowerCase()}`
          ? 1
          : -1,
      );
      const abridgedResults = sortedResults.map(
        ({ email, id, firstName, lastName }) => {
          return { email, id, name: `${firstName} ${lastName}` };
        },
      );
      res.status(200).send(abridgedResults);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};

const find = (req, res) => {
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};

const findStudentsBySubject = (req, res) => {
  Student.find({ subjects: req.params.subject.replace("_", " ") })
    .then((results) => {
      const nameAndEmail = results.map((result) => {
        return {
          name: `${result.firstName} ${result.lastName}`,
          email: `${result.email}`,
        };
      });
      res.status(201).send(nameAndEmail);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};

const create = (req, res) => {
  const student = new Student(req.body);
  student
    .save()
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      console.error(err);
      if (
        err.errors.email &&
        err.errors.email.properties.message === "Email already exists"
      ) {
        res
          .status(409)
          .send({ message: "Sorry, that email address is aleady taken!" });
      } else {
        res
          .status(500)
          .send({ message: "Sorry, there was an error! Please try again." });
      }
    });
};

const destroy = (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send(err);
    });
};

const modify = (req, res) => {
  Student.findByIdAndUpdate(req.params.id, req.body)
    .then(() => {
      Student.findById(req.params.id)
        .then((result) => {
          res.status(201).send(result);
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
      if (err.codeName && err.codeName === "DuplicateKey") {
        res
          .status(409)
          .send({ message: "Sorry, that email address is aleady taken!" });
      } else {
        res
          .status(500)
          .send({ message: "Sorry, there was an error! Please try again." });
      }
    });
};

module.exports = {
  findAll,
  find,
  create,
  destroy,
  modify,
  findStudentsBySubject,
};
