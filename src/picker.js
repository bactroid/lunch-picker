// This is stupid and it hurts me. I just want to get this shit on AWS Lambda.
const restaurants = [
  {name: 'El Indio', closed: [], veto: []},
  {name: 'La Pasadita', closed: [], veto: []},
  {name: 'Relish', closed: [], veto: []},
  {name: 'David\'s BBQ', closed: [], veto: []},
  {name: 'Kebab House', closed: [], veto: []},
  {name: 'Sweetberries', closed: [], veto: []},
  {name: 'Waffle House', closed: [], veto: []},
  {name: 'Bagels and Noodles', closed: [], veto: []},
  {name: 'Momoyaki', closed: [], veto: []},
  {name: 'Red Onion', closed: [], veto: []},
  {name: 'Public and General', closed: [], veto: []},
  {name: 'Steamers', closed: ['Monday'], veto: []},
  {name: 'Abuela\'s', closed: ['Monday'], veto: []},
  {name: 'Crane Ramen', closed: ['Monday'], veto: []},
  {name: 'Steamers', closed: ['Monday'], veto: []},
  {name: 'Satchel\'s', closed: ['Monday'], veto: []},
  {name: 'Indian Cuisine', closed: ['Monday'], veto: []},
  {name: 'Liquid Ginger', closed: ['Monday'], veto: []},
  {name: 'Andaz', closed: ['Monday'], veto: []},
  {name: 'Mojo Hogtown BBQ', closed: ['Monday'], veto: []},
  {name: 'Flaco\'s', closed: ['Monday'], veto: []}
]

const getRandomIndex = arr => Math.floor((Math.random() * arr.length))
const selectRandom = arr => arr[getRandomIndex(arr)]

const getRandomRestaurant = () => {
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
