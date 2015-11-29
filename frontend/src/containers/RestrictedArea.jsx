import React from 'react'
import { connect } from 'react-redux'

const RestrictedArea = React.createClass({
    render() {
        return (
            <div>Restricted Area</div>
        )
    }
})

export default connect(state => state)(RestrictedArea)
