// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
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
  return Restaurant.create(req.body)
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

// edit page
app.get('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// save edit
app.post('/restaurants/:id/edit', (req, res) => {
  const id = req.params.id

  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))  
})

// delete page
app.post('/restaurants/:id/delete', (req, res) =>{
  const id = req.params.id

  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
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
  Restaurant.find({ $or: [
    { "name": { "$regex": `${keyword}`, "$options": "i" } },
    { "category": { "$regex": `${keyword}`, "$options": "i" } }
  ] })
    .lean()
    .then(restaurant => {
      // check if there is any matched results
      if (Array.isArray(restaurant) && restaurant.length === 0) {
        res.render('no_match', { keyword })
      } else {
        res.render('index', { restaurant, keyword })
      }
    })
    .catch(error => console.log(error))
})

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})