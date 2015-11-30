import * as common from './common'
import { updatePath } from 'redux-simple-router'

export const LOGIN_RESOLVE      = "LOGIN_RESOLVE"
export const LOGIN_REJECT       = "LOGIN_REJECT"
export const REGISTER_RESOLVE   = "REGISTER_RESOLVE"
export const REGISTER_REJECT    = "REGISTER_REJECT"
export const RESET              = "RESET"

export const loginResolve       = user      => ({ type: LOGIN_RESOLVE, user })
export const loginReject        = error     => ({ type: LOGIN_REJECT, error })
export const registerResolve    = user      => ({ type: REGISTER_RESOLVE, user })
export const registerReject     = error     => ({ type: REGISTER_REJECT, error })
export const reset              = reset     => ({ type: RESET })

export function loginQuery (username, password) {
    return dispatch => {
        dispatch(common.fetchingStart())

        /* Mock backend response */
        setTimeout(() => {
            dispatch(common.fetchingEnd())
            dispatch(common.notificationSet({
                status: common.constants.NOTIFICATION_SUCCESS,
                content: "Successfully logged in"
            }))
            dispatch(loginResolve({
                id: 1,
                token: "dfg98dig98d6tgh87gdn9a78",
                username: username,
            }))
            dispatch(updatePath('/'))
        }, 1000)
    }
}

export function registerQuery (username, password, passwordbis) {
    return dispatch => {
        dispatch(common.fetchingStart())

        /* Mock backend response */
        setTimeout(() => {
            dispatch(common.fetchingEnd())
            dispatch(common.notificationSet({
                status: common.constants.NOTIFICATION_ERROR,
                content: "Failed to register"
            }))
            dispatch(loginReject({
                message: "Invalid mandatory fields",
                validations: [{
                    field: "username",
                    error: "This username already exists"
                }]
            }))
        }, 1000)
    }
}
