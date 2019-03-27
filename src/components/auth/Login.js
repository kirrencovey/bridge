import React, { Component } from "react"
import "./login.css"
import UserManager from "../../modules/UserManager"
import { Link } from 'react-router-dom'
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Form, FormGroup } from 'reactstrap'

export default class Login extends Component {
  // Set initial state
  constructor(props) {
    super(props)
    this.state = {
      password: "",
      email: "",
      emptyModal: false,
      wrongModal: false
    }

      this.toggleEmptyFieldModal = this.toggleEmptyFieldModal.bind(this)
      this.toggleWrongModal = this.toggleWrongModal.bind(this)
  }

  toggleEmptyFieldModal() {
    this.setState(prevState => ({
      emptyModal: !prevState.emptyModal
    }))
  }

  toggleWrongModal() {
    this.setState(prevState => ({
      wrongModal: !prevState.wrongModal
    }))
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
        response => {
          if (typeof response.error !== 'undefined') {
            this.toggleWrongModal()
          } else {
            sessionStorage.setItem("credentials", response.token)
            this.props.setAuth()
            this.props.history.push("/")
          }
        }
      )
    } else {
      this.toggleEmptyFieldModal()
    }
  }


  render() {
    return (
      <div className="homeCard">
        <h1 className="homeTitle">bridge!</h1>
        <div className="homeText">an app for animal trainers</div>

      {/* error modals */}
      <Modal isOpen={this.state.emptyModal} toggle={this.toggleEmptyFieldModal} className={this.props.className}>
        <ModalHeader toggleEmptyFieldModal={this.toggleEmptyFieldModal}>Oops!</ModalHeader>
        <ModalBody>
            Please fill out all fields!
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleEmptyFieldModal}>OK</Button>
        </ModalFooter>
      </Modal>
      <Modal isOpen={this.state.wrongModal} toggle={this.toggleWrongModal} className={this.props.className}>
        <ModalHeader toggleWrongModal={this.toggleWrongModal}>Oops!</ModalHeader>
        <ModalBody>
            Wrong email or password!
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleWrongModal}>OK</Button>
        </ModalFooter>
      </Modal>

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
