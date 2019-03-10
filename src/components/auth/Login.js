import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"

export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    username: ""
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  handleRegister = e => {
    e.preventDefault()
    const newUser = {
      email: this.state.email,
      password: this.state.password
    }
    if (this.state.email && this.state.password) {
      UserManager.searchEmail(this.state.email).then(users => {
        if (users.length) {
          alert(`Email ${this.state.email} already exits!`)
        } else {
          UserManager.add(newUser, "users").then(user => {
            sessionStorage.setItem("credentials", parseInt(user.id))
            this.props.setAuth()
          })
        }
      })
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  handleLogin = e => {
    e.preventDefault()
    if (this.state.email && this.state.password) {
      UserManager.searchEP(this.state.email, this.state.password).then(
        user => {
          if (!user.length) {
            alert("Wrong email or password!")
          } else {
            sessionStorage.setItem("credentials", parseInt(user[0].id))
            this.props.setAuth()
          }
        }
      )
    } else {
      alert("Please Fill Out Form 😬!")
    }
  }

  render() {
    return (
      <React.Fragment>
        <h1>Bridge!</h1>
        <h3>An app for animal trainers</h3>
        <form className="loginForm">
          <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
          <label htmlFor="inputEmail">Email</label>
          <input
            onChange={this.handleFieldChange}
            type="email"
            id="email"
            placeholder={`email@email.com`}
            required=""
            autoFocus=""
          />
          <label htmlFor="inputPassword">Password</label>
          <input
            onChange={this.handleFieldChange}
            type="password"
            id="password"
            placeholder={` Don't tell!`}
            required=""
          />
          <button type="submit" onClick={this.handleLogin}>
            Sign in
          </button>
          <button type="submit" onClick={this.handleRegister}>
            Register
          </button>
        </form>
      </React.Fragment>
    )
  }
}
