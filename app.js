// require packages and set variables
const express = require('express')
const exphbs = require('express-handlebars')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const methodOverride = require('method-override')
const routes = require('./routes')
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

// use method-override
app.use(methodOverride('_method'))

app.use(routes)

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})