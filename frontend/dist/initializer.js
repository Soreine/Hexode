const initialState = {
    common: {
        pending: false,
        notification: null,
        validations: [],
        games: []
    },
    unrestricted_area: {
        //user: { id: 1, token: "patate", username: "KtorZ" }
        user: null
    },
    lobby: {
        games: [],
        joinRequest: null,
        createRequest: null
    }
}

getInitialState = function (reducer) { return initialState[reducer] }
