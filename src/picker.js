const AWS = require('aws-sdk')
const client = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

// Wrap the DynamoDB client scan in a promise
const clientScan = table => {
  return new Promise((resolve, reject) => {
    client.scan({TableName: table}, (err, data) => {
      if (err) {
        reject(err)
      }
      resolve(data)
    })
  })
}

const getRestaurants = async table => {
  const result = await clientScan(table)
  return result.Items
}

const getRandomIndex = arr => Math.floor((Math.random() * arr.length))
const selectRandom = arr => arr[getRandomIndex(arr)]

const getRandomRestaurant = async () => {
  const restaurants = await getRestaurants('lunch-picker-dev-restaurants')
  const dayOfWeek = getDay(new Date())
  if (dayOfWeek === 'Friday') return {name: 'Big Lou\'s'}
  return selectRandom(restaurants.filter(openToday(dayOfWeek)))
}

const getDay = date => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

const openToday = day => restaurant => restaurant.closed.find(x => x === day) === undefined

module.exports = {
  getRestaurants,
  selectRandom,
  getRandomRestaurant,
  getDay,
  openToday
}
