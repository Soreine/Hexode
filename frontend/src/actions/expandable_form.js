export const TOGGLE_FORM = 'TOGGLE_FORM'
export const SEND_LOGIN = 'SEND_LOGIN'
export const RESOLVE_LOGIN = 'RESOLVE_LOGIN'
export const REJECT_LOGIN = 'REJECT_LOGIN'

export function toggleForm (expanded) {
    return { type: TOGGLE_FORM, expanded }
}

let sendLogin = () => ({ type: SEND_LOGIN })
let resolveLogin = user => ({ type: RESOLVE_LOGIN, user })
let rejectLogin = error => ({ type: REJECT_LOGIN, error })

export function login (username, password) {
    return dispatch => {
        dispatch(sendLogin())

        setTimeout(() => {
            dispatch(rejectLogin("Unable to login")) // fake
        }, 1000)
    }
}
