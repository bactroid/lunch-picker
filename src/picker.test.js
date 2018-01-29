const picker = require('./picker')


describe('selectRandom', () => {
  test('Returns an item from a passed in array', () => {
    const list = ['El Indio', 'La Pasadita', 'Steamers']
    const actual = picker.selectRandom(list)
    const isInList = list.find(x => x === actual) !== undefined
    expect(isInList).toBe(true)
  })
})

describe('readRestaurants', () => {
  test('Reads in contents of file', () => {
    const expected = ['El Indio', 'La Pasadita', 'Steamers']
    const error = {status: 'exploded'}

    const readFile = (file, enc) =>
          Promise.resolve(file === 'restaurants.json' && enc === 'utf-8' ? expected : error)

    picker.readRestaurants(readFile)
      .then(actual => {
        expect(actual).toEqual(expected)
      })
  })
})
