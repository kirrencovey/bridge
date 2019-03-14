import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"
import { Button } from 'reactstrap'
import { Link } from 'react-router-dom'


export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    username: ""
  }

  goToRegister = evt => {
    this.props.history.push("/register")
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

  //When login button is clicked
  handleLogin = e => {
    e.preventDefault()
    if (this.state.email && this.state.password) {

      //Checks if email and password are in data
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


  //TO DO make separate login and register forms - register takes first and last name
  render() {
    return (
      <React.Fragment>
        <h1>Bridge!</h1>
        <h3>An app for animal trainers</h3>

        <form className="loginForm" id="loginForm">
          <h1 className="h3 mb-3 font-weight-normal">Sign In</h1>
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
          <Button color="secondary" type="submit" onClick={this.handleLogin}>
            Sign in
          </Button>
        </form>

        New user?
        <Link to="/register" >
        <Button color="info" type="submit">
            Register
        </Button>
      </Link>
      </React.Fragment>
    )
  }
}
