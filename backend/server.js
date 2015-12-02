#!/usr/bin/env node

/* Define configuration from local environment */
const SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
const SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080
const DB_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost'
const DB_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017
const DB_USERNAME = process.env.OPENSHIFT_MONGODB_DB_USERNAME
const DB_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD
const DB_NAME = "hexode"
const DB_URL = "mongodb://" + (DB_USERNAME ? DB_USERNAME + ":" + DB_PASSWORD + "@" : "") +
    DB_HOST + ":" + DB_PORT + "/" + DB_NAME

/* Define the configuration for the app */
const CONFIG = require('./src/config.js');
CONFIG.DB_URL = DB_URL;

/* Launch the app and start listening */
require('babel-polyfill');
require('./dist/app.js').listen(SERVER_PORT, SERVER_IP, () => {
    console.log("Connected on " + SERVER_IP + ":" + SERVER_PORT)
})
