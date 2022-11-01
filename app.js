// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000

// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// route setting
app.get('/', (req, res) => {
  res.render('index')
})

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})