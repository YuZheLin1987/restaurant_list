// require express and express.Router
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')
const users = require('./modules/users')

// route setting
router.use('/restaurants', restaurants)
router.use('/users', users)
router.use('/', home)

// export
module.exports = router