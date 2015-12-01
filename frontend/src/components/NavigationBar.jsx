import React from 'react'
import '../styles/components/navigation_bar.scss'

export default React.createClass({
    render() {
        return (<div className="navigationbar-wrapper">
            <div className="navigationbar-brand">
                Hexode
            </div>
            <div className="navigationbar-right">
                <div className="navigationbar-user">
                    { this.props.username }
                </div>
                <ul className="navigationbar-menu">
                    { this.props.children }
                </ul>
            </div>
        </div>)
    }
})
