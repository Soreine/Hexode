const chalk = require('chalk')

const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
// const NOT_FOUND = 404
const INTERNAL_SERVER_ERROR = 500

exports.MISSING_PARAMETERS = function (...params) {
    return {
        code: BAD_REQUEST,
        message: "Missing required parameter(s)",
        details: params.join(", ")
    }
}

exports.REGISTRATION_FAILED = function (msg) {
    return {
        code: BAD_REQUEST,
        message: "Unable to register the user",
        details: plsStringify(msg)
    }
}

exports.DEBUG = function (err) {
    if (typeof err == 'object') {
        console.log(chalk.red(err.stack))
    }
    return {
        code: INTERNAL_SERVER_ERROR,
        message: "Unkown error",
        details: plsStringify(err)
    }
}

exports.WRONG_CREDENTIALS = function () {
    return {
        code: FORBIDDEN,
        message: "Invalid credentials. Access not allowed",
    }
}

exports.UNAUTHORIZED = function () {
    return {
        code: UNAUTHORIZED,
        message: "Valid access token required",
    }
}

function plsStringify(anything) {
    switch (typeof anything) {
    case 'string':
        return anything
    case 'object':
        if (anything.toString !== undefined) {
            return anything.toString()
        } else {
            break
        }
    }
    return JSON.stringify(anything)
}
