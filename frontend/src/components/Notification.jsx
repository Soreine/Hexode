import React from 'react'
import Div from './Div'
import '../styles/components/notification.scss'

export default React.createClass({
    classname(status) {
        return ["notification-wrapper"].concat(`notification-${status}`).join(" ").toLowerCase()
    },

    render() {
        const  { status, content } = this.props
        return (
            <Div
                className = { this.classname(status) }
                onClick   = { this.props.onClick }
                content   = { content }
            />
        )
    }
})
