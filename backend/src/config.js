const DB_HOST = process.env.OPENSHIFT_MONGODB_DB_HOST || 'localhost'
const DB_PORT = process.env.OPENSHIFT_MONGODB_DB_PORT || 27017
const DB_USERNAME = process.env.OPENSHIFT_MONGODB_DB_USERNAME
const DB_PASSWORD = process.env.OPENSHIFT_MONGODB_DB_PASSWORD
const DB_NAME = "hexode"
const DB_URL = "mongodb://" + (DB_USERNAME ? DB_USERNAME + ":" + DB_PASSWORD + "@" : "") +
    DB_HOST + ":" + DB_PORT + "/" + DB_NAME

const CONFIG = {
    //Add Static conf values here
    DB_URL: DB_URL,
    USER_TOKEN_EXPIRATION: 1000 * 60 * 60 * 24 * 30, // 30 days
    GAME_TOKEN_EXPIRATION: 1000 * 60 * 60 * 24 , // 1 day
    SECRET_KEY: process.env.SECRET_KEY || "developmentKey",
    CLIENT_FILE: process.cwd() + "/dist/client/app.html"
}

module.exports = CONFIG
