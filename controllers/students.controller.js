const Student = require("../models/student.js");

const findAll = (req, res) => {
  Student.find()
    .then((results) => {
      const sortedResults = results.sort((a, b) =>
        `${a.lastName} ${a.firstName}` > `${b.lastName} ${b.firstName}` ? 1 : -1
      );
      const abridgedResults = sortedResults.map(
        ({ email, id, firstName, lastName }) => {
          return { email, id, name: `${firstName} ${lastName}` };
        }
      );
      res.status(200).send(abridgedResults);
    })
    .catch((err) => {
      console.error(err);
    });
};

const find = (req, res) => {
  Student.findById(req.params.id)
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      console.error(err);
    });
};

const findStudentsBySubject = (req, res) => {
  Student.find({ subjects: req.params.subject.replace("_", " ") })
    .then((results) => {
      res.status(201).send(results);
    })
    .catch((err) => {
      console.error(err);
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
    });
};

const destroy = (req, res) => {
  Student.findByIdAndDelete(req.params.id)
    .then((result) => {
      res.status(204).send();
    })
    .catch((err) => {
      console.error(err);
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
