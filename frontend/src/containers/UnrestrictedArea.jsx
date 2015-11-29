import React from 'react'
import { connect } from 'react-redux'

const RestrictedArea = React.createClass({
    render() {
        return (
            <div>Unrestricted Area</div>
        )
    }
})

export default connect(state => state)(RestrictedArea)
