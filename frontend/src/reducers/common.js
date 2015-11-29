import * as actions from '../actions/common'

const defaultState = {
    pending: false,
    notification: null,
    validations: []
}

export default function (state = defaultState, action) {
    switch (action.type) {
        case actions.NOTIFICATION_SET:
            return Object.assign({}, state, {
                notification: action.notification
            })

        case actions.NOTIFICATION_READ:
            return Object.assign({}, state, {
                notification: null
            })

        case actions.FETCHING_START:
            return Object.assign({}, state, {
                pending: true
            })

        case actions.FETCHING_END:
            return Object.assign({}, state, {
                pending: false
            })

        default: return state
    }
}
