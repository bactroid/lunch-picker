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

const getRestaurants = async table => {
  const result = await clientScan(table)
  return result.Items
}

module.exports = {
  getRestaurants
}
