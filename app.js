// require packages and set variables
const express = require('express')
const session = require('express-session')
const exphbs = require('express-handlebars')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
// use dotenv in devDependencies only
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
require('./config/mongoose')
const app = express()
const port = 3000


// template engine setting
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// static file import
app.use(express.static('public'))

app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true
}))

// use body-parser
app.use(bodyParser.urlencoded({ extended: true }))

// use method-override
app.use(methodOverride('_method'))

app.use(routes)

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})