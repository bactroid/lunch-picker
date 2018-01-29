const {promisify} = require('util')
const fs = require('fs')
const readFile = promisify(fs.readFile)

const getRandomIndex = arr => Math.floor((Math.random() * arr.length))
const selectRandom = arr => arr[getRandomIndex(arr)]

const readRestaurants = async (read = readFile) => {
  const restaurants = await read('restaurants.json', 'utf-8')
  return restaurants
}

const getRandomRestaurant = async () =>
  selectRandom(JSON.parse(await readRestaurants()))

module.exports = {
  selectRandom,
  readRestaurants,
  getRandomRestaurant
}
