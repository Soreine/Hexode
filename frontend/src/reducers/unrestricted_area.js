import * as actions from '../actions/unrestricted_area'

const defaultState = { user: null }

export default function (state = defaultState, action) {
    switch (action.type) {
        case actions.LOGIN_RESOLVE:
        case actions.REGISTER_RESOLVE:
            return Object.assign({}, state, { user: action.user })

        case actions.LOGIN_REJECT:
        case actions.REGISTER_REJECT:
            return Object.assign({}, state, { user: null })

        default: return state
    }
}
