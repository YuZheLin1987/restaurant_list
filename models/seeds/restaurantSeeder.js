if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const db = require('../../config/mongoose')
const restaurantData = require('../../restaurant.json').results

// require restaurant model
const Restaurant = require('../restaurant')


db.once('open', () => {
  console.log('mongodb connected!')

  for (i = 0; i < restaurantData.length; i++) {
    Restaurant.create({
      name: `${restaurantData[i].name}`,
      name_en: `${restaurantData[i].name_en}`,
      category: `${restaurantData[i].category}`,
      image: `${restaurantData[i].image}`,
      location: `${restaurantData[i].location}`,
      phone: `${restaurantData[i].phone}`,
      google_map: `${restaurantData[i].google_map}`,
      rating: `${restaurantData[i].rating}`,
      description: `${restaurantData[i].description}`
    })
  }

  console.log('done')
})