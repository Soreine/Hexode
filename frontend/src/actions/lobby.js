import * as common from './common'
import * as unrestricted_area from './unrestricted_area'
import { updatePath } from 'redux-simple-router'

export const GAMES_RESOLVE  = "GAMES_RESOLVE"
export const GAMES_REJECT   = "GAMES_REJECT"
export const RESET          = "RESET"

export const gamesResolve   = games => ({ type: GAMES_RESOLVE, games })
export const gamesReject    = error => ({ type: GAMES_REJECT, error })
export const reset          = ()    => ({ type: RESET })

export function logoutQuery () {
    return dispatch => {
        dispatch(common.fetchingStart())
        dispatch(updatePath('/logout'))

        /* Mock backend response */
        setTimeout(() => {
            dispatch(common.fetchingEnd())
            dispatch(common.reset())
            dispatch(unrestricted_area.reset())
            dispatch(reset())
            dispatch(common.notificationSet({
                status: common.constants.NOTIFICATION_SUCCESS,
                content: "Successfully logged out"
            }))
            dispatch(updatePath("/login"))
        }, 150)
    }
}

export function gamesQuery(silent) {
    return dispatch => {
        dispatch(common.fetchingStart())

        /* Mock backend response */
        setTimeout(() => {
            dispatch(common.fetchingEnd())
            dispatch(gamesResolve([ //TODO trigger action from common
                { id: 1, name: "game #1", maxPlayer: 2, nbPlayer: 1 },
                { id: 2, name: "game #2", maxPlayer: 2, nbPlayer: 2 },
                { id: 3, name: "game #3", maxPlayer: 2, nbPlayer: 1 }
            ]))
        }, 500)
    }
}

