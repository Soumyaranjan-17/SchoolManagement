const express = require('express')
const router = express.Router();

router.get('/', (req, res) => {
    res.render('index')
})

router.get('/admin-login', (req, res) => {
    res.render('admin-login')
})


module.exports = router