const CONFIG = require('./config.js')
var mongodb = require('mongodb')

/** () -> Promise(mongodb.Db, Error) */
mongodb.connect = () => {
    return mongodb.MongoClient.connect(CONFIG.DB_URL)
}

/** (mongodb.Db -> Promise(a, e)) -> Promise(a, e) */
mongodb.operation = (operate) => {
    return mongodb.connect()
    .then(db => {
        return operate(db)
        .then(success => {
            db.close()
            return success
        }, failure => {
            console.log('failed')
            db.close();
            throw failure;
        })
    })
}

module.exports = mongodb
