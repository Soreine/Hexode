import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import { syncReduxAndRouter } from 'redux-simple-router'
import { Router, Route, IndexRoute, Redirect } from 'react-router'

import reducer from './reducers'
import * as containers from './containers'

const store = applyMiddleware(thunk)(createStore)(reducer)
const history = createBrowserHistory()
syncReduxAndRouter(history, store)


//TODO: move elsewhere
const onlyAuthenticated = getState => (_, redirect) => {
    if (getState().unrestricted_area.user == null) {
        return redirect(null, '/login')
    }
}

const onlyNonAuthenticated = getState => (_, redirect) => {
    if (getState().unrestricted_area.user != null) {
        return redirect(null, '/')
    }
}

// DEBUG
store.subscribe(() => {
    //console.log(JSON.stringify(store.getState(), null, 2))
})

ReactDOM.render(
    <Provider store={store}>
        <Router history={history}>
            <Route
                path="/"
                component={containers.App}>
                <IndexRoute
                    component={containers.Lobby}
                    onEnter={onlyAuthenticated(store.getState)}
                />
                <Route
                    path="login"
                    component={containers.UnrestrictedArea}
                    onEnter={onlyNonAuthenticated(store.getState)}
                />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>,
    document.getElementById('app')
)
