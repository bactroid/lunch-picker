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

describe('removeVetoedChoices', () => {
  test('removes vetoed restaruants from list', () => {
    const attendees = ['alice', 'bob', 'carol']

    const restaurants = [
      { name: 'The Max', closed: [], veto: [] },
      { name: 'Dockside Bar', closed: [], veto: ['carol'] },
      { name: 'New Dehli Deli', closed: [], veto: ['bob'] }
    ]

    const expected = [ { name: 'The Max', closed: [], veto: [] } ]

    expect(picker.removeVetoedChoices(attendees)(restaurants)).toEqual(expected)
  })
})

describe('parseAttendeeList', () => {
  test('converts input string into list of users', () => {
    const input = '@alice @bob @carol '
    const expected = ['alice', 'bob', 'carol']
    expect(picker.parseAttendeeList(input)).toEqual(expected)
  })

  test('handles input with no valid users', () => {
    const input = 'no usernames entered lol'
    const expected = []
    expect(picker.parseAttendeeList(input)).toEqual(expected)
  })
})
