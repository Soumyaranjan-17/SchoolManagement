const express = require('express')
const router = express.Router();
const { body, validationResult } = require("express-validator");
const userModel = require('../models/user.model'); // Import the User model
const bcrypt = require('bcrypt');

// jwt
const jwt = require('jsonwebtoken');



router.get('/', (req, res) => {
    res.render('index')
})

router.get('/admin-login', (req, res) => {
    res.render('admin-login')
})

router.get('/admin-signup', (req, res) => {
    res.render('admin-signup')
})

router.post(
    "/admin-signup",
    body("username").trim().isLength({ min: 5 }),
    body("role").trim(),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        try {
            // Run the validation and get errors (if any)
            const errors = validationResult(req);

            // Check for validation errors
            if (!errors.isEmpty()) {
                return res.status(400).json({
                    errors: errors.array(),
                    message: "Invalid data",
                });
            }

            const { username, role, password } = req.body;

            // Check if username already exists
            const existingUser = await userModel.findOne({
                username: username
            });

            if (existingUser) {
                return res.status(400).json({
                    message: "Username already exists"
                });
            }

            const hashPassword = await bcrypt.hash(password, 10);

            const newUser = await userModel.create({
                username,
                role,
                password: hashPassword,
            });

            res.send(newUser);

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: "Server error" });
        }
    }
);


// admin login post 
router.post(
    "/admin-login",
    body("username").trim(),
    body("password").trim().isLength({ min: 5 }),
    async (req, res) => {
        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({
                errors: errors.array(),
                message: "Invalid data",
            });
        }

        const { username, password } = req.body;
        try {
            const user = await userModel.findOne({ username });

            if (!user || !(await bcrypt.compare(password, user.password))) {
                return res.status(400).json({
                    message: "Invalid username or password",
                });
            }

            const token = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "1h" }
            );

            res.cookie("token", token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
            });

            return res.render("login-success", {
                username: user.username,
                role: user.role,
            });
        } catch (err) {
            console.error("Error during login:", err);
            res.status(500).json({ message: "Internal server error" });
        }
    }
);



module.exports = router