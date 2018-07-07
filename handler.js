'use strict'

const picker = require('./src/picker')

const makeReply = text => ({
  statusCode: 200,
  body: JSON.stringify({
    response_type: 'in_channel',
    text
  })
})

module.exports.lunchpicker = (event, context, callback) => {
  callback(null, makeReply(picker.getRandomRestaurant().name))
}
