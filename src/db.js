const {prop, composeP} = require('ramda')
const AWS = require('aws-sdk')
const client = new AWS.DynamoDB.DocumentClient({region: 'us-east-1'})

// TableName :: String

// DayOfWeek :: String ( Monday | Tuesday | Wednesday | Thursday | Friday
//                     | Saturday | Sunday)

// Restaurant :: Object { name :: String
//                      , closed :: [DayOfWeek]
//                      , veto :: [String]
//                      }

// DynamoDbResult :: Object { Items :: [Restaurant]
//                          , Count :: Number
//                          , ScannedCount :: Number
//                          }

// Wrap the DynamoDB client scan in a promise
// clientScan :: TableName -> Promise DynamoDbResult
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

// getRestaurants :: TableName -> Promise [Restaurants]
const getRestaurants = composeP(prop('Items'), clientScan)

module.exports = {
  getRestaurants
}
