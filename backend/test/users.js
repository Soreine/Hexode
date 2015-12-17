var expect = require('expect.js')
var utils = require('./utils')

describe("User registration", () => {
    var user = { username: "KtorZ", password: "password" }
    beforeEach(done => {
        utils.mongo(db => {
            return db.collection('users')
                .deleteOne({ username: user.username })
                .then(() => done())
                .catch(done)

        })
    })

    context("Given a non-existing user", () => {
        it("Should be able to register", done => {
            utils.request({
                path: '/users',
                method: 'POST'
            }, user)
            .then(res => {
                expect(res.code).to.equal(201)
                expect(res.result.id).to.be.ok()
                expect(res.result.token).to.be.ok()
                expect(res.result.username).to.equal(user.username)
                expect(res.result.createdAt).to.be.below(Date.now())
                expect(Object.keys(res.result).length).to.equal(4)
                done()
            })
            .catch(done)
        })
    })
})
