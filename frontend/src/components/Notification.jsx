import React from 'react'
import Div from './Div'
import '../styles/components/notification.scss'

export default React.createClass({
    classname(status) {
        let classnames = ["notification-wrapper"]
        return status === 'error' ?
            classnames.concat('notification-error').join(" ") :
            classnames
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
