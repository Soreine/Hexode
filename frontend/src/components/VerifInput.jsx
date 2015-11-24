import React from 'react'

export default React.createClass({

    render() {
        const { type, placeholder } = this.props
        return (
            <input type={ type || 'text' } placeholder={ placeholder } />
        )
    }
})
