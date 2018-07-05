const picker = require('./src/picker')

picker.getRandomRestaurant()
  .then(result => console.log(result.name))
  .catch(err => console.error(err))
