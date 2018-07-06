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
  // const response = {
  //   statusCode: 200,
  //   body: JSON.stringify({
  //     message: 'Go Serverless v1.0! Your function executed successfully!',
  //     input: event
  //   })
  picker.getRandomRestaurant()
    .then(restaurant => callback(null, (makeReply(restaurant.name))))
    .catch(e => console.err(e))
}
