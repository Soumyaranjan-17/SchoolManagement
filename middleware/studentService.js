const Student = require('../models/student.model');

// Check if student already exists by student_id or reg_no
const checkExistingStudent = async (student_id, reg_no) => {
    return await Student.findOne({
        $or: [
            { student_id },
            { reg_no }
        ]
    });
};

// Create a new student
const createNewStudent = async (studentData) => {
    const newStudent = new Student(studentData);
    await newStudent.save();
    return newStudent;
};

module.exports = {
    checkExistingStudent,
    createNewStudent
};
