const BAD_REQUEST = 400
// const UNAUTHORIZED = 401
// const FORBIDDEN = 403
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
    return {
        code: INTERNAL_SERVER_ERROR,
        message: "TODO",
        details: plsStringify(err)
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
