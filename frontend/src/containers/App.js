import React from 'react'
import { connect } from 'react-redux'
import { toggleForm, login } from '../actions/expandable_form'
import { resetError } from '../actions/errors'
import ExpandableForm from '../components/ExpandableForm'
import Notification from '../components/Notification'

const App = React.createClass({
    toggleForm: function (expanded) {
        this.props.dispatch(toggleForm(!expanded))
    },

    login: function (username, password) {
        this.props.dispatch(login(username, password))
    },

    renderFetchInfos: function (message) {
        return (<p>{ message }</p>)
    },

    renderNotification: function (error) {
        return (
            <Notification
                status  = "error"
                content = { error }
                onClick = { () => this.props.dispatch(resetError()) }
            />
        )
    },

    render() {
        const { expanded, fetching, error } = this.props

        return (
            <div>
                { error    && this.renderNotification(error) }
                { fetching && this.renderFetchInfos(fetching) }
                <ExpandableForm
                    onExpand = { this.toggleForm }
                    onLogin  = { this.login }
                    expanded = { expanded }
                    disabled = { fetching !== null }
                />
            </div>
        )
    }
})

function select (state) {
    return state;
}

export default connect(select)(App)

