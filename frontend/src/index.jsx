import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import { Router, Route, IndexRoute } from 'react-router'

import reducer from './reducers'
import * as containers from './containers'

const store = applyMiddleware(thunk)(createStore)(reducer)
const history = createBrowserHistory()
syncReduxAndRouter(history, store)


const authenticate = state => (_, redirect) => {
    if (state.common.user == null) {
        return redirect(null, '/login')
    }
}

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route
                path="/"
                component={containers.App}>
                <IndexRoute
                    component={containers.Lobby}
                    onEnter={authenticate(store.getState())}
                />
                <Route
                    path="login"
                    component={containers.UnrestrictedArea}
                />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
