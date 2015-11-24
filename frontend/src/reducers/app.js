import { TOGGLE_FORM, LOGIN, REGISTER } from '../actions/expandable_form'


const defaultState = {
    expanded: false,
    notification: ""
}

export default function formReducer (state = defaultState, action) {
    switch (action.type) {
        case TOGGLE_FORM:
            return Object.assign({}, state, {
                expanded: action.expanded
            })

        case LOGIN:
            return Object.assign({}, state, {
                notification: "TODO login"
            })

        case REGISTER:
            return Object.assign({}, state, {
                notification: "TODO register"
            })

        default:
            return state
    }
}
