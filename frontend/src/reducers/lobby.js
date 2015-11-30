import * as actions from '../actions/lobby'

export default function (state = getInitialState('lobby'), action) {
    switch (action.type) {
        case actions.GAMES_RESOLVE:
            return Object.assign({}, state, {
                games: action.games
            })

        case actions.RESET:
            return {
                games: [],
                joinRequest: null,
                createRequest: false
            }

        case actions.GAMES_REJECT:
        default:
            return state
    }
}
