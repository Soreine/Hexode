import React from 'react'
import ReactDOM from 'react-dom'
import createBrowserHistory from 'history/lib/createBrowserHistory'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { Router, Route, IndexRoute, Redirect } from 'react-router'
import { createStore, applyMiddleware, combineReducers, compose } from 'redux'
import { syncReduxAndRouter } from 'redux-simple-router'

/* Only for development */
import { DevTools, DebugPanel, LogMonitor } from 'redux-devtools/lib/react'
import { devTools } from 'redux-devtools'


import reducer from './reducers'
import * as containers from './containers'

const store = compose(applyMiddleware(thunk), devTools())(createStore)(reducer)
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
    <div>
    <Provider store={store}>
        <Router history={history}>
            <Route path="/" component={containers.App}>
                <IndexRoute component={containers.Lobby} onEnter={onlyAuthenticated(store.getState)} />
                <Route path="login" component={containers.UnrestrictedArea} onEnter={onlyNonAuthenticated(store.getState)}/>
                <Route path="logout" onEnter={onlyAuthenticated(store.getState)} />
                <Redirect from="*" to="/" />
            </Route>
        </Router>
    </Provider>
    <DebugPanel top right bottom>
        <DevTools store={store} monitor={LogMonitor}/>
    </DebugPanel>
    </div>
    ,
    document.getElementById('app')
)
