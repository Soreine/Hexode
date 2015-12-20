const expect = require('expect.js')
const utils = require('./utils')

describe("User registration", () => {
    const user = { username: "KtorZ", password: "password" }
    const invalidExt = "@%^"
    const endpoint = { path: "/users", method: "POST" }

    const reset = done => {
        const after = utils.after(2, done)

        utils.mongo([
            db => db.collection('users')
              .deleteOne({ username: user.username })
              .then(after),
            db => db.collection('users')
              .deleteOne({ username: user.username + invalidExt })
              .then(after)
        ]).catch(done)
    }

    afterEach(reset)

    context("Given a non-existing user", () => {
        before(reset)

        it("it should be able to register that user", done => {
            utils.request(endpoint, user)
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

        it("it should return an error if a wrong username is provided", done => {
            utils.request(endpoint, Object.assign({}, user, { username: "KtorZ" + invalidExt }))
                 .then(res => {
                     expect(res.code).to.equal(400)
                     done()
                 })
                 .catch(done)
        })

        it("it should return an error if a wrong password is provided", done => {
            utils.request(endpoint, Object.assign({}, user, { password: "14" }))
                 .then(res => {
                     expect(res.code).to.equal(400)
                     done()
                 })
                 .catch(done)
        })

        it("it should return an error if a no data are transmitted", done => {
            utils.request(endpoint)
                 .then(res => {
                     expect(res.code).to.equal(400)
                     done()
                 })
                 .catch(done)
        })
    })

    context("Given an existing user", () => {
        before(done => {
            utils.mongo(db => db.collection('users')
                .insertOne(user)
                .then(() => done())
                .catch(done)
            )

        })

        it("it should return an error if one's try to register the same username", done => {
            utils.request(endpoint, user)
                 .then(res => {
                     expect(res.code).to.equal(400)
                     return utils.mongo(db => db.collection('users')
                        .count({ username: user.username })
                        .then(res => {
                            expect(res).to.equal(1)
                            done()
                        }))
                 })
                .catch(done)
        })
    })
})
