// require express and express.Router
const express = require('express')
const router = express.Router()

// require Restaurant module
const Restaurant = require('../../models/restaurant')

// route setting
// home page
router.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// search function
router.get('/search', (req, res) => {
  const keyword = req.query.keyword

  // check input validation (empty or blank space)
  if (!keyword.trim()) {
    res.redirect('/')
    return
  }

  // searching with keyword
  Restaurant.find({
    $or: [
      { "name": { "$regex": `${keyword}`, "$options": "i" } },
      { "category": { "$regex": `${keyword}`, "$options": "i" } }
    ]
  })
    .lean()
    .then(restaurant => {
      // check if there is any matched results
      if (restaurant.length === 0) {
        res.render('no_match', { keyword })
      } else {
        res.render('index', { restaurant, keyword })
      }
    })
    .catch(error => console.log(error))
})

// export
module.exports = router