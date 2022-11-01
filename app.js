// require packages and set variables
const express = require('express')
const app = express()
const port = 3000

// route setting
app.get('/', (req, res) => {
  res.send('This is from index')
})

// start and listen to server
app.listen(port, () => {
  console.log(`This express server is running at http://localhost:${port}`)
})