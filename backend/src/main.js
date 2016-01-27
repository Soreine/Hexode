const express = require('express')
const router = require('./routes')
const bodyParser = require('body-parser')
const serveClient = require('./middlewares/serve_client')

const app = express()

// Automatically parses application/json body and put it in req.body
app.use(express.static('dist/client'))
app.use(bodyParser.json())
app.use(serveClient)

app.use(router)
app.use((err, req, res, next) => { // eslint-disable-line no-unused-vars
    console.log(`[Error] ${err.code} : ${err.message}`)
    res.status(err.code)
    res.json(err)
})

module.exports = app
