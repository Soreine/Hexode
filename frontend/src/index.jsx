require('babel-polyfill')
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import appReducer from './reducers/app'
import App from './containers/App'

let store = applyMiddleware(thunk)(createStore)(appReducer)

ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('app')
)
