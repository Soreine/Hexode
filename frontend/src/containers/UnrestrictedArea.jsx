import React from 'react'
import { connect } from 'react-redux'

import * as actions from '../actions/unrestricted_area'
import ExpandableForm from '../components/ExpandableForm'

const RestrictedArea = React.createClass({
    handleFormLogin(...credentials) {
        this.props.dispatch(actions.loginQuery(...credentials))
    },

    handleFormRegister(...credentials) {
        this.props.dispatch(actions.registerQuery(...credentials))
    },

    render() {
        const { pending, validations } = this.props

        return (
            <ExpandableForm
                disabled={pending}
                onLogin={this.handleFormLogin}
                onRegister={this.handleFormRegister}
            />
        )
    }
})

const select = state => {
    return {
        pending: state.common.pending,
        validations: state.common.validations
    }
}

export default connect(select)(RestrictedArea)
