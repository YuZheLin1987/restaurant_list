// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const restaurantFile = require('./restaurant.json')
const Restaurant = require('./models/restaurant')
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

// static file import
app.use(express.static('public'))

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// route setting
// index page
app.get('/', (req, res) => {
  Restaurant.find()
    .lean()
    .then(restaurant => res.render('index', { restaurant }))
    .catch(error => console.log(error))
})

// new page
app.get('/restaurants/new', (req, res) => {
  return res.render('new')
})

// create new data
app.post('/restaurants', (req, res) => {
  const name = req.body.name
  const name_en = req.body.name_en
  const category = req.body.category
  const image = req.body.image
  const location = req.body.location
  const phone = req.body.phone
  const google_map = req.body.google_map
  const rating = req.body.rating
  const description = req.body.description

  return Restaurant.create({ name, name_en, category, image, location, phone, google_map, rating, description })
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// show page
app.get('/restaurants/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
          .lean()
          .then(restaurant => res.render('show', { restaurant }))
          .catch(error => console.log(error))
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