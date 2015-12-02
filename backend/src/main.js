const CONFIG = require('./config.js');
const express = require('express');
const app = module.exports = express();

// TEMPORARY - FRONTEND TESTING

let user = null
let games = []

app.get('/users/authenticate', function (req, res) {
    user = {
        id: 14,
        username: req.params.username,
        token: "user12345"
    }
    res.json({
        "token": user.token
    })
})

app.post('/users', function (req, res) {
    user = {
        id: 14,
        username: req.params.username,
        token: "user12345"
    }
    res.json(user)
})

app.get('/games', function (req, res) {
    res.json(games)
})

app.get('/games/authenticate', function (req, res) {
    res.json({
        token: "game12345"
    })
})

app.patch('/games/:gameId/join', function (req, res) {
    let game = games.find(x => x.id == req.params.gameId)
    game.players.push({
        id: user.id,
        units: 21
    }).slice(0, 2)
    res.json(game)
})

app.get('/games/:gameId', function (req, res) {
    res.json(games.find(x => x.id === req.params.gameId))
})

app.patch('/games/:gameId/invade', function (req, res) {
    res.status(200)
    res.send()
})

app.post('/games', function (req, res) {
    games.push(req.params.game)
    res.json(req.params.game)
})

app.get('/logout', function (req, res) {
    games = []
    user = null
    res.status(200)
    res.send()
})

setInterval(createGame, 5000)
setInterval(() => games = [], 50000)

function createGame() {
    games.push({
        id: "game" + Date.now(),
        name: "game" + Date.now(),
        currentPlayerId: 42,
        currentRound: 1,
        board: {},
        players: [{
            id: 42,
            units: 21
        }]
    })
}

app.get('/init.js', function (req, res) {
    res.send(
       "const initialState = {\n"+
       "    common: {\n"+
       "         pending: false,\n"+
       "         notification: null,\n"+
       "         validations: [],\n"+
       "         games: []\n"+
       "     },\n"+
       "     unrestricted_area: {\n"+
       "         user: " + JSON.stringify(user) + "\n" +
       "     },\n"+
       "     lobby: {\n"+
       "         games: [],\n"+
       "         joinRequest: null,\n"+
       "         createRequest: null\n"+
       "     }\n"+
       " }\n"+
       " getInitialState = function (reducer) { return initialState[reducer] }\n"
    )
})

app.use(require('./routes'));
