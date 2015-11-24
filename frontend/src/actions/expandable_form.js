export const TOGGLE_FORM = 'TOGGLE_FORM'
export const LOGIN = 'LOGIN'
export const REGISTER = 'REGISTER'

export function toggleForm (expanded) {
    return { type: TOGGLE_FORM, expanded }
}

export function login (credentials) {
    return { type: LOGIN, credentials }
}

export function register (credentials) {
    return { type: REGISTER, credentials }
}
