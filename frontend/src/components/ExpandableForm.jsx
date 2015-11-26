import React from 'react'
import VerifInput from './VerifInput'
import '../styles/components/expandable_form.scss'

export default React.createClass({
    handleClick: function (e) {
        e.preventDefault()
        this.props.onExpand(this.props.expanded)
    },
    handleLogin: function (e) {
        e.preventDefault()
        this.props.onLogin(this.refs.username.value, this.refs.password.value)
    },
    handleRegister: function (e) {

    },
    render() {
        const { expanded, disabled } = this.props
        const passwordBis = (<VerifInput ref="passwordbis" type="password" placeholder="password (again)" />)

        return (
            <div className="exp-form-wrapper">
                <form onSubmit = { expanded ? this.handleRegister : this.handleLogin }>
                    <VerifInput ref="username" placeholder="username" />
                    <VerifInput ref="password" type="password" placeholder="password" />
                        { expanded && passwordBis }
                    <input
                        type = "submit"
                        disabled = { disabled }
                        value = { expanded ? "Register" : "Login" }
                    />
                </form>
                    <a onClick={this.handleClick}>
                        { expanded ? "Back to login" : "Create an account" }
                    </a>
            </div>
        )
    }
})
