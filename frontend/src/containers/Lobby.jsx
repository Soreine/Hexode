import React from 'react'
import { connect } from 'react-redux'

import NavigationBar from '../components/NavigationBar'
import NavigationItem from '../components/NavigationItem'
import * as lobby from '../actions/lobby'

const Lobby = React.createClass({
    logout(e) {
        e.preventDefault()
        this.props.dispatch(lobby.logoutQuery())
    },

    componentDidMount() {
        this.props.dispatch(lobby.gamesQuery())
    },

    render() {
        const { username, games } = this.props

        const renderGames = games => {
            return games.map((x, i) => {
                return (<div key={i}>{x.name}</div>)
            })
        }

        return (<div>
            <NavigationBar username={username}>
                <NavigationItem name="logout" onClick={this.logout} />
            </NavigationBar>
            <div>
                {renderGames(games)}
            </div>
        </div>)
    }
})

function select (state) {
    return {
        username: state.unrestricted_area.user.username,
        games: state.lobby.games,
        joinRequest: state.lobby.joinRequest,
        createRequest: state.lobby.createRequest
    }
}

export default connect(select)(Lobby)
