const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const restaurantData = require('../../restaurant.json').results
const SEED_USERS = [{
  email: 'user1@example.com',
  password: '12345678',
  restaurantId: [ 1, 2, 3 ]
}, {
  email: 'user2@example.com',
  password: '12345678',
  restaurantId: [ 4, 5, 6 ]
}]

// require model
const Restaurant = require('../restaurant')
const User = require('../user')

db.once('open', () => {
  SEED_USERS.forEach(user => {
    const userRestaurantId = user.restaurantId
    bcrypt
      .genSalt(10)
      .then(salt => bcrypt.hash(user.password, salt))
      .then(hash => User.create({
        email: user.email,
        password: hash
      }))
      .then(user => {
        const userId = user._id
        const userRestaurant = restaurantData.filter(restaurant => {
          return userRestaurantId.includes(restaurant.id)
        })
        return Promise.all(Array.from(
          { length: userRestaurant.length },
          (_, i) => {
            Restaurant.create({
              name: userRestaurant[i].name,
              name_en: userRestaurant[i].name_en,
              category: userRestaurant[i].category,
              image: userRestaurant[i].image,
              location: userRestaurant[i].location,
              phone: userRestaurant[i].phone,
              google_map: userRestaurant[i].google_map,
              rating: userRestaurant[i].rating,
              description: userRestaurant[i].description,
              userId
            })
          }
        ))
      })
      .then(() => console.log(`seed user - ${user.email} - done`))
  })
})