const BAD_REQUEST = 400
const UNAUTHORIZED = 401
const FORBIDDEN = 403
const NOT_FOUND = 404

exports.MISSING_PARAMETERS = function (...params) {
    return {
        code: BAD_REQUEST,
        message: "missing mandatory parameter in " + params.join(", ")
    }
}
