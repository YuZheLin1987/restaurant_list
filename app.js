// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const restaurantFile = require('./restaurant.json')
const app = express()
const port = 3000

// use dotenv in devDependencies only
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config({ override: true })
}

// connect to database
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('error', () => {
  console.log('mongodb error!')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

app.use(express.static('public'))

// route setting
// index page
app.get('/', (req, res) => {
  res.render('index', { restaurantFile: restaurantFile.results })
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const restaurant = restaurantFile.results.find(restaurant => req.params.id === restaurant.id.toString())
  res.render('show', { restaurant })
})

// search function
app.get('/search', (req, res) => {
  const keyword = req.query.keyword
  
  // check input validation (empty or blank space)
  if (!keyword.trim()) {
    res.redirect('/')
    return
  }

  // searching with keyword
  const filteredRestaurants = restaurantFile.results.filter(restaurant => {
    return restaurant.name.toLowerCase().includes(keyword.trim().toLowerCase()) || restaurant.category.toLowerCase().includes(keyword.trim().toLowerCase())
  })

  // check if there is any matched results
  if (Array.isArray(filteredRestaurants) && filteredRestaurants.length === 0) {
    res.render('no_match', { keyword })
  } else {
    res.render('index', { restaurantFile: filteredRestaurants, keyword })
  }
})

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})