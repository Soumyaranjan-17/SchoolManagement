const express = require('express') // Core framework for creating the server
const morgan = require('morgan') // Middleware for logging HTTP requests
const indexRoutes = require('./routes/index.routes')
const adminRoutes = require('./routes/admin.routes')
const cookieParser = require('cookie-parser');
const authMiddleware = require('./middlewares/auth.middleware');


require('dotenv').config(); // Loads environment variables from a .env file
require('./config/db')(); // Imports and immediately invokes the database connection function


const app = express()

app.use(morgan('dev'))
app.set('view engine', 'ejs')

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexRoutes)
app.use('/admin', authMiddleware, adminRoutes)


const PORT = 3000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is runing on http://localhost:${PORT}`)
})