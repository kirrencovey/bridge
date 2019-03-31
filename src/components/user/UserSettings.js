import React, { Component } from 'react'
import { Button } from 'reactstrap'
import UserManager from '../../modules/UserManager';

// UserManager.get(this.props.activeUser, "users")

class UserSettings extends Component {
    render() {
        return (
            <section className="pageContents">
                <h2 className="formTitle">Your Details</h2>
                Name: {this.props.activeUser.firstName} {this.props.activeUser.lastName}
                <br />
                Email: {this.props.activeUser.email}
                <br />
                Password: change password //TODO
            </section>
        )
    }
}

export default UserSettings