const express = require('express') // Core framework for creating the server
const morgan = require('morgan') // Middleware for logging HTTP requests
const indexroutes = require('./routes/index.routes')
const adminroutes = require('./routes/admin.routes')

require('dotenv').config(); // Loads environment variables from a .env file
require('./config/db')(); // Imports and immediately invokes the database connection function


const app = express()

app.use(morgan('dev'))
app.set('view engine', 'ejs')
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', indexroutes)
app.use('/admin', adminroutes)



// Sample Students Data
  
//   // Route for Admin Dashboard
//   app.get('/admin-dash', (req, res) => {
//     res.render('dashboard', { students });
//   });
  

const PORT = 3000
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is runing on http://localhost:${PORT}`)
})