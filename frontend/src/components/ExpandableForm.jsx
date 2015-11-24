import React from 'react'
import VerifInput from './VerifInput'
import '../styles/components/expandable_form.scss'

export default React.createClass({
    handleClick: function (e) {
        e.preventDefault()
        this.props.onClick(this.props.expanded)
    },
    render() {
        const { expanded } = this.props
        const passwordBis = (<VerifInput type="password" placeholder="password (again)" />)

        return (
            <div className="exp-form-wrapper">
                <VerifInput placeholder="username" />
                <VerifInput type="password" placeholder="password" />
                { expanded && passwordBis }
                <input type="button" value={ expanded ? "Register" : "Login" } />
                <a onClick={this.handleClick}>{
                    expanded ? "Back to login" : "Create an account"
                }</a>
            </div>
        )
    }
})
