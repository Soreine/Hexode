const expect = require('expect.js')
const dateFormat = require('dateformat')
const utils = require('./utils')

const CREATE = { path: "/games", method: "POST" }
const DELETE = { path: "/games/", method: "DELETE" }
// Adds Authorization header to the request object
function authorize(request, token) {
    return Object.assign(
        { headers: {'Authorization': `userToken=${token}` } },
        request)
}

describe("Game lifecycle", () => {

    context("Given an authenticated user", () => {
        const now = dateFormat(Date.now(), "hh-MM-ss")
        var user = { username: `KtorZ_${now}`,
                     password: 'patate',
                     createdAt: undefined, // for now
                     token: undefined // for now
                   }
        const gameName = "KtorZ's game"
        const gamePassword = "also patate"

        // Create and authenticate the test user
        before(done => {
            utils.request({
                path: '/users',
                method: 'POST'
            }, user)
                .then(res => {
                user = Object.assign({}, user, res.result) // Adds createdAt
                return utils.request({
                    path: `/users/authenticate?username=${user.username}`,
                    headers: { Authorization: `password=${user.password}` }
                }).then(res => {
                    user = Object.assign({}, user, res.result) // Adds token
                    done()
                })
            })
            .catch(done)
        })

        afterEach(done => {
            utils.mongo(db => db.dropCollection('games')
                .then(() => done())
                .catch(done))
        })

        // Delete the test user
        after(done => {
            utils.mongo(db => db.dropCollection('users')
                .then(() => done())
                .catch(done))
        })

        function checkGameObject(game) {
            expect(game.id).to.be.a('string')
            expect(game.name).to.be.a('string')
            expect(game.createdAt).to.be.a('number')
            expect(game.createdAt).to.be.lessThan(Date.now())
            expect(game.restricted).to.be.a('boolean')
            expect(game.board).to.be.a('string')
            expect(game.players).to.be.an('array')
            game.players.map(p => {
                expect(p).to.have.keys(['id','username'])
            })
            return Promise.resolve(game)
        }

        it("should be able to create a new game without any password", done => {
            utils.request(authorize(CREATE, user.token), { name: gameName })
                 .then(res => {
                     expect(res.code).to.be(201)
                     return checkGameObject(res.result)
                 })
                 .then(() => utils.mongo(
                    db => db.collection('games')
                            .findOne({ name: gameName })
                            .then(res => {
                                expect(res).to.be.ok()
                                expect(res.restricted).to.be(false)
                                done()
                            })
                    )
                 )
                 .catch(done)
        })

        return

        it("should be able to create a new game with a password", done => {
            utils.request(CREATE, Object.assign({ password: "patate"}, game))
                 .then(res => {
                     expect(res.code).to.be(201)
                     return checkGameObject(res.result)
                 })
                 .then(() => utils.mongo(
                    db => db.collection('games')
                            .findOne(game)
                            .then(res => {
                                expect(res).to.be.ok()
                                expect(res.result.password).to.be.a('string')
                                expect(res.result.password).to.be.a('string')
                                done()
                            })
                    )
                 )
                 .catch(done)
        })

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
