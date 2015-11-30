import React from 'react'
import { connect } from 'react-redux'

import Notification from '../components/Notification'
import * as actions from '../actions/common'

import '../styles/containers/app.scss'

const App = React.createClass({
    createNotification(notification) {
        return (<Notification {...notification} onClick={this.hideNotification}/>)
    },

    createLoader() {
        return (<div className="loader"></div>)
    },

    hideNotification() {
        this.props.dispatch(actions.notificationRead())
    },

    render() {
        const { notification, pending } = this.props

        return (<div>
            {pending && this.createLoader()}
            {notification && this.createNotification(notification)}
            {this.props.children}
        </div>)
    }
})

function select (state) {
    return {
        pending: state.common.pending,
        notification: state.common.notification
    }
}

export default connect(select)(App)

