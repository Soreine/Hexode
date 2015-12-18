#!/usr/bin/env node

/* Define configuration from local environment */
const SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
const SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080

/* Launch the app and start listening */
require('babel-polyfill')
require('./dist/app.js').listen(SERVER_PORT, SERVER_IP, e => {
    if (e != null) {
        console.log(e)
        process.exit(1)
    }
    console.log("Connected on " + SERVER_IP + ":" + SERVER_PORT)
})
