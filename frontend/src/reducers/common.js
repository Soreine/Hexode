const defaultState = {
    user: null,
    pending: false,
    notification: null,
    validations: []
}

export default function (state = defaultState, action) {
    switch (action.type) {
        default: return state
    }
}
