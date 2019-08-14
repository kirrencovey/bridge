import React, { Component } from 'react'
import { Button, Form, FormGroup, Input, Label } from 'reactstrap'
import UserManager from '../../modules/UserManager';

// UserManager.get(this.props.activeUser, "users")

class UserSettings extends Component {

    // Set initial state
//   constructor(props) {
//     super(props)

    state = {
        //   email: "",
        //   emptyModal: false,
        //   wrongModal: false,
        currentPassword: "",
        newPassword: "",
        verifyPassword: ""
    }

    // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  showPasswordForm = e => {
      document.querySelector("#passwordForm").classList.toggle("hidden")
      document.querySelector("#showPassFormBtn").classList.toggle("hidden")
  }

  //When save button is clicked
  updatePassword = e => {
    e.preventDefault()
    const updatedUser = {
        id: this.props.activeUser.id,
        password: this.state.newPassword,
        currentPassword: this.state.currentPassword
      }
        // Check that new password entered the same in both fields
        if (this.state.newPassword === this.state.verifyPassword) {
            UserManager.updatePassword(updatedUser)
            .then(response => {
                sessionStorage.setItem("credentials", response.token)
            })
            .then(() => document.querySelector("#passwordForm").classList.toggle("hidden"))
            .then(() => document.querySelector("#passwordForm").reset())
            .then(() => document.querySelector("#showPassFormBtn").classList.toggle("hidden"))
            .then(() => window.alert("Password updated!"))
            .catch(error => window.alert(error));
        } else {
            window.alert("Oops! Your new passwords don't match!")
        }
  }

    render() {
        return (
            <section className="pageContents">
                <h2 className="formTitle">Your Details</h2>
                Name: {this.props.activeUser.firstName} {this.props.activeUser.lastName}
                <br />
                Email: {this.props.activeUser.email}
                <br />
                <Button color="secondary"
                    id="showPassFormBtn"
                    type="submit"
                    onClick={this.showPasswordForm}
                >Update Password</Button>
                 <Form id="passwordForm" className="hidden formContainer">
                 <h4 className="formTitle">Update Password</h4>
                    <FormGroup>
                        <Label for="currentPassword">Enter Current Password</Label>
                        <Input
                            onChange={this.handleFieldChange}
                            type="password"
                            name="currentPassword"
                            id="currentPassword"
                            placeholder="current password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="newPassword">New Password</Label>
                        <Input
                            onChange={this.handleFieldChange}
                            type="password"
                            name="newPassword"
                            id="newPassword"
                            placeholder="new password"
                        />
                    </FormGroup>
                    <FormGroup>
                        <Label for="verifyPassword">Verify New Password</Label>
                        <Input
                            onChange={this.handleFieldChange}
                            type="password"
                            name="verifyPassword"
                            id="verifyPassword"
                            placeholder="verify new password"
                        />
                    </FormGroup>
                <Button color="info"
                    type="submit"
                    onClick={this.updatePassword}
                >Update</Button>
                </Form>
            </section>
        )
    }
}

export default UserSettings
