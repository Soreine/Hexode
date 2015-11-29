import React from 'react'
import { connect } from 'react-redux'

import Notification from '../components/Notification'
import * as actions from '../actions/common'

import '../styles/containers/app.scss'

const App = React.createClass({
    createNotification(notification) {
        return (<Notification {...notification} onClick={this.hideNotification}/>)
    },

    hideNotification() {
        this.props.dispatch(actions.notificationRead())
    },

    render() {
        const { notification } = this.props

        return (<div>
            {notification && this.createNotification(notification)}
            {this.props.children}
        </div>)
    }
})

function select (state) {
    return {
        notification: state.common.notification
    }
}

export default connect(select)(App)

