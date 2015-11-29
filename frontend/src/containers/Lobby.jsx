import React from 'react'
import { connect } from 'react-redux'

const Lobby = React.createClass({
    render() {
        return (<div>Lobby</div>)
    }
})

function select (state) {
    return {}
}

export default connect(select)(Lobby)

