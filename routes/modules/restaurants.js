// require express and express.Router
const express = require('express')
const router = express.Router()

// require Restaurant module
const Restaurant = require('../../models/restaurant')

// route setting
// new page
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new data
router.post('/', (req, res) => {
  return Restaurant.create(req.body)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// show page
router.get('/:id', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('show', { restaurant }))
    .catch(error => console.log(error))
})

// edit page
router.get('/:id/edit', (req, res) => {
  const id = req.params.id
  return Restaurant.findById(id)
    .lean()
    .then(restaurant => res.render('edit', { restaurant }))
    .catch(error => console.log(error))
})

// save edit
router.put('/:id', (req, res) => {
  const id = req.params.id

  Restaurant.findByIdAndUpdate(id, req.body)
    .then(() => res.redirect(`/restaurants/${id}`))
    .catch(error => console.log(error))
})

// delete page
router.delete('/:id', (req, res) => {
  const id = req.params.id

  Restaurant.findByIdAndDelete(id)
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// export
module.exports = router