/* Define configuration from local environment */
const SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
const SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080
const MAIN = './main.js'

var app = require('http').Server(require(MAIN))

function restart() {
    // Flush console output
    // process.stdout.write('\x1Bc')
    Object.keys(require.cache)
          .filter(x => new RegExp(`^${__dirname}`).test(x))
          .forEach(x => delete require.cache[x])
    app.close(() => {
        app = require('http').Server(require(MAIN))
        app.listen(SERVER_PORT, SERVER_IP, e => {
            if (e != null) {
                console.log(e)
                process.exit(1)
            }
            console.log(`[${Date.now()}]Connected on ${SERVER_IP}:${SERVER_PORT}`)
        })
    })
}

if (["--development", "-D", "--dev"].indexOf(process.argv[2]) !== -1) {
    /* Watch for changes */
    require('watch').watchTree(__dirname, {'ignoreDotFiles': true}, restart)
} else {
    restart()
}
