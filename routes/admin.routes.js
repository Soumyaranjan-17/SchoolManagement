const express = require("express");
const { body, validationResult } = require("express-validator");
const validateStudent = require('../middlewares/validateStudent');
const { checkExistingStudent, createNewStudent } = require('../middlewares/studentService');
const { sendSuccessResponse, sendErrorResponse } = require('../middlewares/responseHelper');
const authMiddleware = require('../middlewares/auth.middleware');
const Student = require("../models/student.model"); // Import the Student model
const router = express.Router();


router.get("/dashboard",authMiddleware, async (req, res) => {
    try {
        // Fetch all students from the database
        const students = await Student.find(); // You can modify this query to filter, sort, etc.

        // Render the dashboard view and pass the students data
        res.render("dashboard", { students });
    } catch (error) {
        console.error("Error fetching students from DB:", error);
        res.status(500).send("Internal Server Error");
    }
});

router.get("/add-student", authMiddleware, (req, res) => {
    res.render("add-student");
});

// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// In app

router.post("/add-student", authMiddleware, validateStudent, async (req, res) => {
    try {
        // Validate input data
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return sendErrorResponse(res, "Validation errors occurred", 400, errors.array());
        }

        const { student_id, reg_no, roll_no, name, email, phone, address, parents, admission_year } = req.body;

        // Check if student already exists
        const existingStudent = await checkExistingStudent(student_id, reg_no);
        if (existingStudent) {
            const errorMessage = existingStudent.student_id === student_id
                ? "Student ID already exists"
                : "Registration Number already exists";
            return sendErrorResponse(res, errorMessage, 400);
        }

        // Create and save the new student
        try {
            const newStudent = await createNewStudent({ 
                student_id, reg_no, roll_no, name, email, phone, address, parents, admission_year 
            });

            // Send success response
            return res.render("studentAddedSuccess", { newStudent });

        } catch (dbError) {
            if (dbError.code === 11000) {
                // Duplicate key error (MongoDB specific)
                const duplicateField = Object.keys(dbError.keyValue).join(", ");
                return sendErrorResponse(res, `Duplicate value found for: ${duplicateField}`, 400);
            }
            throw dbError; // Re-throw for generic error handling
        }

    } catch (error) {
        console.error("Error while adding student:", error);
        sendErrorResponse(res, "Internal server error", 500);
    }
});


router.delete('/delete-student/:id',authMiddleware, async (req, res) => {
    try {
        const studentId = req.params.id;  // Get the student ID from URL params

        // Find and delete the student from the database
        const deletedStudent = await Student.findByIdAndDelete(studentId);

        if (!deletedStudent) {
            return res.status(404).json({ message: "Student not found" });
        }

        // Send a success response
        res.status(200).json({
            message: "Student deleted successfully",
            student: deletedStudent
        });
    } catch (error) {
        console.error("Error while deleting student:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});


module.exports = router;
