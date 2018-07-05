const {promisify} = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile)

const getRandomIndex = arr => Math.floor((Math.random() * arr.length))
const selectRandom = arr => arr[getRandomIndex(arr)]

const readRestaurants = async (read = readFile) => {
  const restaurants = await read('restaurants.json', 'utf-8')
  return restaurants
}

const getRandomRestaurant = async () => {
  const restaurants = JSON.parse(await readRestaurants())
  return selectRandom(restaurants.filter(openToday(getDay(new Date()))))
}

const getDay = date => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
  return days[date.getDay()]
}

const openToday = day => restaurant => restaurant.closed.find(x => x === day) === undefined

module.exports = {
  selectRandom,
  readRestaurants,
  getRandomRestaurant,
  getDay,
  openToday
}
