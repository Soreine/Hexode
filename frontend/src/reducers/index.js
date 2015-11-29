import { combineReducers } from 'redux'

import { routeReducer } from 'redux-simple-router'
import unrestricted_area from './unrestricted_area'
import common from './common'

export default combineReducers({
    common,
    unrestricted_area,
    routing: routeReducer
})
