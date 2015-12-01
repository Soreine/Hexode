import React from 'react'
import '../styles/components/navigation_item.scss'

export default React.createClass({
    render() {
        return (<li className="navigationitem">
            <a href="#" onClick={this.props.onClick}>{this.props.name}</a>
        </li>)
    }
})
