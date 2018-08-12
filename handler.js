const {composeP} = require('ramda')
const {getRestaurants} = require('./src/db')
const {getRandomRestaurant} = require('./src/picker')

const makeReply = text => ({
  statusCode: 200,
  body: JSON.stringify({
    response_type: 'in_channel',
    text
  })
})

// selectRestaurant :: TableName -> Promise Restaurant
const selectRandomRestaurantFromTable = composeP(getRandomRestaurant, getRestaurants)

module.exports.lunchpicker = (event, context, callback) => {
  selectRandomRestaurantFromTable('lunch-picker-dev-restaurants')
    .then(restaurant => {
      callback(null, makeReply(restaurant.name))
    })
}
