const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404

exports.MISSING_PARAMETERS = function (...params) {
    return {
        code: BAD_REQUEST,
        message: "missing mandatory parameter(s)",
        details: params.join(", ")
    }
}

exports.REGISTRATION_FAILED = function (msg) {
    return {
        code: BAD_REQUEST,
        message: "Unable to register the user",
        details: typeof msg === 'string' ?
            msg : typeof msg === 'object' && msg.toString ?
            msg.toString() :
            JSON.stringify(msg)
    }
}
