const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    student_id: { type: String, required: true, unique: true },
    reg_no: { type: String, required: true, unique: true },
    roll_no: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true},
    phone: { type: String, required: true },
    address: { type: String, required: true },
    parents: { type: String, required: true },
    admission_year: { type: String, required: true },
  },
  { timestamps: true }
);

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
