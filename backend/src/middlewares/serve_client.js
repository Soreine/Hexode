const CONFIG = require('../config')

module.exports = (req, res, next) => {
    const requestedWith = req.get('X-Requested-With')
    if (requestedWith === "hexodeclient") { return next() }
    res.sendFile(CONFIG.CLIENT_FILE)
}
