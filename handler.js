const {composeP, compose, prop} = require('ramda')
const {parse} = require('query-string')
const {getRestaurants} = require('./src/db')
const {getRandomRestaurant, parseAttendeeList, removeVetoedChoices} = require('./src/picker')

const errorMessage = 'I\'m having trouble. Maybe just go for coffee?'

const makeReply = text => ({
  statusCode: 200,
  headers: {
    'Access-Control-Allow-Origin': 'https://bactroid.github.io'
  },
  body: JSON.stringify({
    response_type: 'in_channel',
    text
  })
})

module.exports.lunchpicker = (event, context, callback) => {
  // parseAttendeesFromFormData :: LambdaEvent -> [Attendee]
  const parseAttendeesFromFormData = compose(parseAttendeeList, prop('text'), parse, prop('body'))

  const attendees = event.body
    ? parseAttendeesFromFormData(event)
    : []

  // selectRandomRestaurantFromTable :: TableName -> Promise Restaurant
  const selectRandomRestaurantFromTable = composeP(getRandomRestaurant, removeVetoedChoices(attendees), getRestaurants)

  selectRandomRestaurantFromTable(process.env.LUNCH_TABLE)
    .then(restaurant => {
      callback(null, makeReply(restaurant.name))
    })
    .catch(err => {
      console.error(err)
      callback(null, makeReply(errorMessage))
    })
}
