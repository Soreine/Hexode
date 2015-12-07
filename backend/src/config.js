var CONFIG = {
    //Add Static conf values here
    EXPIRATION_DELAY: 1000 * 60 * 60 * 24 * 30, // 30 days
    SECRET_KEY: process.env.SECRET_KEY || "developmentKey"
}

module.exports = CONFIG
