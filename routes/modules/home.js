// require express and express.Router
const express = require('express')
const router = express.Router()

// require Restaurant module
const Restaurant = require('../../models/restaurant')

// route setting
// home page
router.get('/', (req, res) => {
  const userId = req.user._id
  Restaurant.find({ userId })
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

// sorting function
router.get('/sort/asc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/sort/desc', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ name: 'desc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/sort/category', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ category: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

router.get('/sort/location', (req, res) => {
  Restaurant.find()
    .lean()
    .sort({ location: 'asc' })
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// export
module.exports = router