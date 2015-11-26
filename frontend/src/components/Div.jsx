import React from 'react'

export default React.createClass({
    render() {
        return (
            <div { ...this.props }>
                { this.props.content }
            </div>
        )
    }
})
