const mongo = require('mongodb')
const http = require('http')

/** (mongo.db -> Promise) -> () */
exports.mongo = function (actions) {
    if (!Array.isArray(actions)) { actions = [actions] }
    return mongo.MongoClient
         .connect("mongodb://localhost:27017/hexode")
         .then(db => actions
            .reduce((p, action) => p.then(() => action(db)), Promise.resolve())
            .then(() => db.close())
            .catch(e => {
                db.close()
                return Promise.reject(e)
            }))
        .catch(Promise.reject)
}

/** Object -> Option(Object) -> Promise({ code, result }, error) */
exports.request = function (options, data) {
    const headers = Object.assign({
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json'
    }, options && options.headers || {})

    options = Object.assign({
        hostname: 'localhost',
        port: 8080,
        method: 'GET'
    }, options, { headers })

    return new Promise((resolve, reject) => {
        const req = http.request(options, res => {
            var buf = ""
            res.setEncoding('utf8')
            res.on('data', b => { buf += b })
            res.on('end', () => {
                resolve({
                    code: res.statusCode,
                    result: JSON.parse(buf)
                })
            })
        })
        req.on('error', reject)
        ;['GET', 'DELETE'].indexOf(options.method) === -1 && data && req.write(JSON.stringify(data))
        req.end()
    })
}

exports.after = function (n, f) {
    return () => --n === 0 && f()
}
