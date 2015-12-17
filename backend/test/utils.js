const mongo = require('mongodb')
const http = require('http')

/** (mongo.db -> Promise) -> () */
exports.mongo = function (action) {
    mongo.MongoClient
         .connect("mongodb://localhost:27017/hexode")
         .then(db => {
            action(db).catch(e => {
                db.close()
                throw e
            })
         })
         .catch(e => { throw e })
}

/** Object -> Option(Object) -> Promise({ code, result }, error) */
exports.request = function (options, data) {
    options = Object.assign({
        hostname: 'localhost',
        port: 8080,
        method: 'GET',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json'
        }
    }, options)
    return new Promise(resolve => {
        const req = http.request(options, res => {
            var buf = ""
            res.setEncoding('utf8')
            res.on('data', b => { buf += b })
            res.on('end', () => {
                const result = JSON.parse(buf)
                resolve({
                    code: res.statusCode,
                    result: result
                })
            })
        })
        req.on('error', e => { throw e })
        data && req.write(JSON.stringify(data))
        req.end()
    })
}
