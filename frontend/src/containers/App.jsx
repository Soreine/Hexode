import React from 'react'
import { connect } from 'react-redux'

const App = React.createClass({
    render() {
        return (
            this.props.children
        )
    }
})

function select (state) {
    return {}
}

export default connect(select)(App)

