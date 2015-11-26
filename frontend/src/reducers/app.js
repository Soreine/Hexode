import { TOGGLE_FORM, SEND_LOGIN, RESOLVE_LOGIN, REJECT_LOGIN } from '../actions/expandable_form'
import { RESET_ERROR } from '../actions/errors'


const defaultState = {
    expanded: false,
    fetching: null,
    error: null,
    user: {
        id: null,
        username: null
    }
}

export default function formReducer (state = defaultState, action) {
    console.log(state, action)
    switch (action.type) {
        case TOGGLE_FORM:
            return Object.assign({}, state, {
                expanded: action.expanded
            })

        case SEND_LOGIN:
            return Object.assign({}, state, {
                fetching: "Login. Please wait..."
            })

        case RESOLVE_LOGIN:
            return Object.assign({}, state, {
                fetching: null,
                user: action.user
            })

        case REJECT_LOGIN:
            return Object.assign({}, state, {
                fetching: null,
                error: action.error
            })

        case RESET_ERROR:
            return Object.assign({}, state, {
                error: null
            })

        default:
            return state
    }
}
