const expect = require('expect.js')
const utils = require('./utils')

var CREATE = { path: "/games", method: "POST" }
var DELETE = { path: "/games/", method: "DELETE" }

describe("Game lifecycle", () => {
    it("is not implemented yet")
    return

    context("Given an authenticated user", () => {
        var user = { username: `KtorZ_${Date.now()}`, password: 'patate' }
        const game = { name: "KtorZ's game" }

        // Create and authenticate the test user
        before(done => {
            utils.request({
                path: '/users',
                method: 'POST'
            }, user)
            .then(res => {
                user = Object.assign({}, user, res.result)
                return utils.request({
                    path: `/users/authenticate?username=${user.username}`,
                    headers: { Authorization: `password=${user.password}` }
                }).then(res => {
                    user = Object.assign({}, user, res.result)
                    CREATE = Object.assign(CREATE, { headers: {
                        'Authorization': `userToken=${user.token}` }})
                    DELETE = Object.assign(DELETE, { headers: {
                        'Authorization': `userToken=${user.token}` }})
                    done()
                })
            })
            .catch(done)
        })

        afterEach(done => {
            utils.mongo(db => {
                db.collection('games')
                  .deleteOne(game)
                  .then(() => done())
                  .catch(done)
            })
        })

        const checkGame = res => {
            expect(res.code).to.equal(201)
            const r = res.result
            expect(r.id).to.be.a('string')
            expect(r.name).to.be.a('string')
            expect(r.currentPlayerId).to.be.a('string')
            expect(r.currentRound).to.be.a('number')
            expect(r.currentCount).to.be.greaterThan(-1)
            expect(r.createdAt).to.be.a('number')
            expect(r.createdAt).to.be.lowerThan(Date.now())
            expect(r.board).to.be.an('object')
            expect(r.board.tiles).to.be.an('array')
            expect(r.players).to.be.an('array')
            expect(r.players.length).to.equal(1)
            expect(Object.keys(r)).to.equal(7)
            return Promise.resolve(res)
        }

        it("should be able to create a new game without any password", done => {
            utils.request(CREATE)
                 .then(checkGame)
                 .then(() => utils.mongo(
                    db => db.collection('games')
                            .findOne(game)
                            .then(res => {
                                expect(res).to.be.ok()
                                expect(res.result.password).not.to.be.ok()
                                done()
                            })
                    )
                 )
                 .catch(done)
        })

        it("should be able to create a new game with a password", done => {
            utils.request(CREATE, Object.assign({ password: "patate"}, game))
                 .then(checkGame)
                 .then(() => utils.mongo(
                    db => db.collection('games')
                            .findOne(game)
                            .then(res => {
                                expect(res).to.be.ok()
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

        // Delete the test user
        after(done => {
            utils.mongo(db => {
                db.collection('users')
                  .deleteOne({ username: user.username })
                  .then(() => done())
                  .catch(done)
            })
        })
    })
})
