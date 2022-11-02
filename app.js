// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const restaurantFile = require('./restaurant.json')
const app = express()
const port = 3000

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

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})