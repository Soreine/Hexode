const expect = require('expect.js')
const dateFormat = require('dateformat')
const utils = require('./utils')
const backendUtils = require('../../src/utils')

const CREATE = { path: "/games", method: "POST" }
const DELETE = { path: "/games/", method: "DELETE" }
/** Returns a new request object with an authorization header */
function authorize(request, token) {
    return Object.assign(
        { headers: {'Authorization': `userToken=${token}` } },
        request)
}

/** Returns a hook that will drops the given collection */
function plsDropCollection(collectionName) {
    return done => {
        utils.mongo(db => db.dropCollection(collectionName)
                    .then(() => done())
                    .catch(done))
    }
}

/**
 * Register and log a user, returning a user object with token
 * { username, password } -> Promise(User)
 */
function registerAndLog(userParam) {
    var user = Object.assign({}, userParam)
    return utils
        .request({
            path: '/users',
            method: 'POST'
        }, user)
        .then(res => {
            user.createdAt = res.result.createdAt
            return utils.request({
                path: `/users/authenticate?username=${user.username}`,
                headers: { Authorization: `password=${user.password}` }
            }).then(res => {
                user.token = res.result.token
                return user
            })
        })
}

describe("Game lifecycle", () => {

    const name = "KtorZ's game"
    const password = "also patate"

    context("An unauthorized and silly user", () => {
        var user = { username: 'GameTest_Evil',
                     password: 'hackerGod'}

        // Create and authenticate the test user
        before(done => {
            registerAndLog(user)
                .then(loggedUser => {
                    Object.assign(user, loggedUser)
                    done()
                })
                .catch(done)
        })

        after(plsDropCollection('users'))

        it("cannot create games without token", done => {
            utils.request(CREATE,
                          { name })
                 .then(res => expect(res.code).to.be(401))
                 .then(() => utils.mongo(
                     db => db.collection('games')
                         .findOne({ name })
                             .then(game => {
                                 expect(game).not.to.be.ok()
                                 done()
                             })))
                 .catch(done)
        })

        it("cannot create games with an expired token", done => {
            var expiredToken = backendUtils.genToken(user.username, Date.now())
            utils.request(authorize(CREATE, expiredToken),
                          { name })
                 .then(res => {
                     expect(res.code).to.be(401)
                     expect(res.result.message).to.be('Expired token')
                 })
                 .then(() => utils.mongo(
                     db => db.collection('games')
                         .findOne({ name })
                             .then(game => {
                                 expect(game).not.to.be.ok()
                                 done()
                             })))
                 .catch(done)
        })
    })

    context("An authenticated user", () => {
        const now = dateFormat(Date.now(), "hh-MM-ss")
        var user = { username: `GameTest_${now}`,
                     password: 'patate',
                     createdAt: undefined, // for now
                     token: undefined // for now
                   }

        // Create and authenticate the test user
        before(done => {
            registerAndLog(user)
                .then(loggedUser => {
                    Object.assign(user, loggedUser)
                    done()
                })
                .catch(done)
        })

        afterEach(plsDropCollection('games'))

        after(plsDropCollection('users'))

        function checkGameObject(game) {
            expect(game.id).to.be.a('string')
            expect(game.name).to.be.a('string')
            expect(game.createdAt).to.be.a('number')
            expect(game.createdAt).to.be.lessThan(Date.now())
            expect(game.restricted).to.be.a('boolean')
            expect(game.board).to.be.a('string')
            expect(game.players).to.be.an('array')
            game.players.map(p => {
                expect(p).to.have.keys(['id', 'username'])
            })
            return Promise.resolve(game)
        }

        it("should be able to create a new game without any password", done => {
            utils.request(authorize(CREATE, user.token),
                          { name })
                 .then(res => {
                     expect(res.code).to.be(201)
                     return checkGameObject(res.result)
                 })
                 .then(() => utils.mongo(
                    db => db.collection('games')
                            .findOne({ name })
                            .then(game => {
                                expect(game).to.be.ok()
                                expect(game.restricted).to.be(false)
                                done()
                            })
                    )
                 )
                 .catch(done)
        })

        it("should be able to create a new game with a password", done => {
            utils.request(authorize(CREATE, user.token),
                          { name, password })
                 .then(res => {
                     expect(res.code).to.be(201)
                     return checkGameObject(res.result)
                 })
                 .then(() => utils.mongo(
                    db => db.collection('games')
                            .findOne({ name })
                            .then(game => {
                                expect(game).to.be.ok()
                                expect(game.restricted).to.be(true)
                                done()
                            })))
                .catch(done)
        })

        return

        context("Given a game belonging to that user", () => {
            before(done => {
                utils.request(CREATE, game)
                     .then(res => {
                         game = res.result
                         DELETE.path += res.result.id
                         done()
                     })
                     .catch(done)
            })


            it("cannot create a game with the same name", done => {
                done(new Error("TODO"))
            })

            it("should be able to delete that game", done => {
                utils.request(DELETE)
                     .then(res => {
                         expect(res).to.be.ok()
                         expect(res.code).to.equal(204)
                         expect(res.result).not.to.be.ok()
                     })
                     .then(() => utils.mongo(
                         db => db.collection('games')
                                 .findOne({ id: game.id })
                                 .then(res => {
                                     expect(res).not.to.be.ok()
                                     done()
                                 })
                     ))
                     .catch(done)
            })
        })
    })
})
