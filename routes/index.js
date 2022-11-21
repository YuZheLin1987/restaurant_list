// require express and express.Router
const express = require('express')
const router = express.Router()
const home = require('./modules/home')
const restaurants = require('./modules/restaurants')

// route setting
router.use('/', home)

router.use('/restaurants', restaurants)

// export
module.exports = router