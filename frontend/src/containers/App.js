import React from 'react'
import { connect } from 'react-redux'
import { toggleForm } from '../actions/expandable_form'
import ExpandableForm from '../components/ExpandableForm'

const App = React.createClass({
    toggleForm: function (expanded) {
        this.props.dispatch(toggleForm(!expanded))
    },
    render() {
        const { expanded } = this.props
        return (
            <ExpandableForm onClick={this.toggleForm} expanded={ expanded }/>
        )
    }
})

function select (state) {
    return state;
}

export default connect(select)(App)

