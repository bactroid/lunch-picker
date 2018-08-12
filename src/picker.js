const {compose, filter} = require('ramda')

// DayOfWeek :: String ( Monday | Tuesday | Wednesday | Thursday | Friday
//                     | Saturday | Sunday)

// Restaurant :: Object { name :: String
//                      , closed :: [DayOfWeek]
//                      , veto :: [String]
//                      }

// getRandomIndex :: [a] -> Number
const getRandomIndex = arr => Math.floor((Math.random() * arr.length))

// selectRandom :: [a] -> a
const selectRandom = arr => arr[getRandomIndex(arr)]

// getRandomRestaurant :: Promise [Restaurant] -> Promise Restaurant
const getRandomRestaurant = async restaurants =>
  today === 'Friday'
    ? {name: 'Big Lou\'s'}
    : selectRandomRestaurantOpenToday(await restaurants)

// days :: [DayOfWeek]
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

// getDay :: Date -> DayOfWeek
const getDay = date => days[date.getDay()]

// today :: DayOfWeek
const today = getDay(new Date())

// openOnDay :: DayOfWeek -> Restaurant -> Boolean
const openOnDay = day => restaurant => restaurant.closed.find(x => x === day) === undefined

// openToday :: Restaurant -> Boolean
const openToday = openOnDay(today)

// selectRandomRestaurantOpenToday :: [Restaurant] -> Restaurant
const selectRandomRestaurantOpenToday = compose(selectRandom, filter(openToday))

module.exports = {
  selectRandom,
  getRandomRestaurant,
  getDay,
  openOnDay
}
