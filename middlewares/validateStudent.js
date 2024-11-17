const { body } = require("express-validator");

const validateStudent = [
  body("student_id")
    .notEmpty()
    .withMessage("Student ID is required")
    .isAlphanumeric()
    .withMessage("Student ID must be alphanumeric"),
  body("reg_no")
    .notEmpty()
    .withMessage("Registration Number is required")
    .isAlphanumeric()
    .withMessage("Registration Number must be alphanumeric"),
  body("roll_no")
    .notEmpty()
    .withMessage("Roll Number is required")
    .isNumeric()
    .withMessage("Roll Number must be numeric"),
  body("name")
    .notEmpty()
    .withMessage("Name is required")
    .isString()
    .withMessage("Name must be a valid string"),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email address"),
  body("phone")
    .notEmpty()
    .withMessage("Phone number is required")
    .isMobilePhone()
    .withMessage("Invalid phone number"),
  body("address").notEmpty().withMessage("Address is required"),
  body("parents").notEmpty().withMessage("Parent's Name is required"),
  body("admission_year")
    .notEmpty()
    .withMessage("Admission Year is required")
    .isNumeric()
    .withMessage("Admission Year must be a number")
    .isLength({ min: 4, max: 4 })
    .withMessage("Admission Year must be a 4-digit year"),
];

module.exports = validateStudent;
