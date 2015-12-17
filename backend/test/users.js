var expect = require('expect.js')
var mongo = require('mongodb')
var http = require('http')

describe("User registration", function () {
    var user = { username: "KtorZ", password: "password" }
    beforeEach(function (done) {
        mongo.MongoClient
             .connect("mongodb://localhost:27017/hexode")
             .then(function (db) {
                 db.collection('users')
                   .deleteOne({ username: user.username })
                   .then(function () {
                        db.close()
                        done()
                   })
                   .catch(function (e) {
                        db.close()
                        throw e
                   })
            })
            .catch(function (e) {
                throw e
            })
    })

    context("Given a non-existing user", function () {
        it("Should be able to register", function (done) {
            var req = http.request({
                hostname: 'localhost',
                port: 8080,
                path: '/users',
                method: 'POST',
                headers: {
                    'X-Requested-With': 'XMLHttpRequest',
                    'Content-Type': 'application/json'
                }
            }, function (res) {
                expect(res.statusCode).to.equal(201)
                var buf = ""
                res.setEncoding('utf8')
                res.on('data', function (b) { buf += b })
                res.on('end', function () {
                    var result = JSON.parse(buf)
                    expect(result.id).to.be.ok()
                    expect(result.token).to.be.ok()
                    expect(result.username).to.equal(user.username)
                    expect(result.createdAt).to.be.below(Date.now())
                    expect(Object.keys(result).length).to.equal(4)
                    done()
                })
            })

            req.write(JSON.stringify(user))
            req.end()
        })
    })
})
