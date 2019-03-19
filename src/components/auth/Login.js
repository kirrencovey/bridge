import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"
import { Link } from 'react-router-dom'
import {
Container, Col, Form,
FormGroup, Label, Input,
Button,
} from 'reactstrap'

export default class Login extends Component {
  // Set initial state
  state = {
    password: "",
    email: ""
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
            this.props.history.push("/")
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
      <div className="homeCard">
        <h1 className="homeTitle">bridge!</h1>
        <div className="homeText">an app for animal trainers</div>


      <div className="formContainer" id="loginForm">
        <h2 className="formTitle">Sign In</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>Email</Label>
              <Input
                onChange={this.handleFieldChange}
                type="email"
                name="email"
                id="email"
                placeholder="myemail@email.com"
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                name="password"
                id="password"
                placeholder="********"
              />
            </FormGroup>
          </Col>
          <Button color="secondary" type="submit" onClick={this.handleLogin}>
            Sign in
          </Button>
        </Form>
      </div>

        <div>New user?</div>
        <Link to="/register" >
        <Button color="info" type="submit">
            Register
        </Button>
      </Link>
      </div>
    )
  }
}
