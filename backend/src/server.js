/* Define configuration from local environment */
const SERVER_IP = process.env.OPENSHIFT_NODEJS_IP || 'localhost'
const SERVER_PORT = process.env.OPENSHIFT_NODEJS_PORT || 8080

var app = require('http').Server(require('./main.js'))

function restart() {
    process.stdout.write('\x1Bc')
    app.close(() => {
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
    require('watch').watchTree('.', {'ignoreDotFiles': true}, restart)
} else {
    restart()
}
