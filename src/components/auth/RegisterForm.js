import React, { Component } from "react"
// import { Button } from 'reactstrap'
import UserManager from '../../modules/UserManager'
import {
  Container, Col, Form,
  FormGroup, Label, Input,
  Button,
  } from 'reactstrap'

export default class Register extends Component {

     // Set initial state
  state = {
    firstName: "",
    lastName: "",
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
          firstName: this.state.firstName,
          lastName: this.state.lastName,
          email: this.state.email,
          password: this.state.password
        }
        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName) {
          //Checks to see if email entered matches any already in the data  ** TO DO make auth more secure
          UserManager.searchEmail(this.state.email).then(users => {
            if (users.length) {
              alert(`That email is already in use!`)
            } else {
              //If email doesn't already exist, adds new user and sets state of active user
              UserManager.add(newUser, "users").then(user => {
                sessionStorage.setItem("credentials", parseInt(user.id))
                this.props.setAuth() //TO DO **????
              })
            }
          })
        } else {
          alert("Please Fill Out Form 😬!")
        }
      }

render() {
    return (
    <div className="homeCard">

      <h1 className="homeTitle">bridge!</h1>
      <div className="homeText">an app for animal trainers</div>

      <div className="formContainer" id="registerForm">
        <h2 className="formTitle">Register</h2>
        <Form className="form">
          <Col>
            <FormGroup>
              <Label>First Name</Label>
              <Input
                onChange={this.handleFieldChange}
                type="firstName"
                id="firstName"
                placeholder="first name"
                required=""
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Last Name</Label>
              <Input
                onChange={this.handleFieldChange}
                type="lastName"
                id="lastName"
                placeholder="last name"
                required=""
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Email</Label>
              <Input
                onChange={this.handleFieldChange}
                type="email"
                id="email"
                placeholder={`email@email.com`}
                required=""
                autoFocus=""
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="examplePassword">Password</Label>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder="**********"
                required=""
              />
            </FormGroup>
          </Col>
          <Button color="info" type="submit" onClick={this.handleRegister}>
            Register
          </Button>
        </Form>
      </div>


</div>
    )
}
}