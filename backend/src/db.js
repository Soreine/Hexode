const CONFIG = require('./config.js')
var mongodb = require('mongodb')

/** Unit -> Promise(mongodb.Db, Error) */
mongodb.connect = () => {
    return mongodb.MongoClient.connect(CONFIG.DB_URL)
}

/** mongodb.Db -> (a -> Promise(a, Error)) */
mongodb.close = db => {
    return result => {
        db.close()
        return Promise.resolve(result)
    }
}

module.exports = mongodb
