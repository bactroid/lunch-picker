const {composeP} = require('ramda')
const {getRestaurants} = require('./src/db')
const {getRandomRestaurant} = require('./src/picker')

const errorMessage = 'I\'m having trouble. Maybe just go for coffee?'

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
  selectRandomRestaurantFromTable(process.env.LUNCH_TABLE)
    .then(restaurant => {
      callback(null, makeReply(restaurant.name))
    })
    .catch(err => {
      console.error(err)
      callback(null, makeReply(errorMessage))
    })
}
