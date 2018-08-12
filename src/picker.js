const {getRestaurants} = require('./db')
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
  selectRandom,
  getRandomRestaurant,
  getDay,
  openToday
}
