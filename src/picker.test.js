const picker = require('./picker')

describe('selectRandom', () => {
  test('Returns an item from a passed in array', () => {
    const list = ['El Indio', 'La Pasadita', 'Steamers']
    const actual = picker.selectRandom(list)
    const isInList = list.find(x => x === actual) !== undefined
    expect(isInList).toBe(true)
  })
})

describe('getDay', () => {
  test('returns Thursday for 2018-07-05T14:49:42.064Z', () => {
    const day = new Date('2018-07-05T14:49:42.064Z')
    expect(picker.getDay(day)).toEqual('Thursday')
  })
})
