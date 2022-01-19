const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const studentSchema = new Schema(
  {
    subjects: {
      type: Array,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    firstName: {
      type: String,
      required: true,
    },
    lastName: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

studentSchema.path("email").validate(async (email) => {
  const emailCount = await mongoose.models.Student.countDocuments({ email });
  return !emailCount;
}, "Email already exists");

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
