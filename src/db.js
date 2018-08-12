const {prop} = require('ramda')
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

const getRestaurants = async table => prop('Items', await clientScan(table))

module.exports = {
  getRestaurants
}
