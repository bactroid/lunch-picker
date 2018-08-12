'use strict'

const picker = require('./src/picker')

const makeReply = text => ({
  statusCode: 200,
  body: JSON.stringify({
    response_type: 'in_channel',
    text
  })
})

module.exports.lunchpicker = async (event, context, callback) => {
  picker.getRandomRestaurant()
    .then(restaurant => {
      callback(null, makeReply(restaurant.name))
    })
}
