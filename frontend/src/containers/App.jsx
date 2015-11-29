import React from 'react'
import { connect } from 'react-redux'

const App = React.createClass({
    render() {
        console.log("children", this.props.children)

        return (
            <div>App</div>
        )
    }
})

export default connect(state => state)(App)

