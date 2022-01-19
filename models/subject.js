const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subjectSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

subjectSchema.path("name").validate(async (name) => {
  const nameCount = await mongoose.models.Subject.countDocuments({ name });
  return !nameCount;
}, "Name already exists");

const Subject = mongoose.model("Subject", subjectSchema);

module.exports = Subject;
