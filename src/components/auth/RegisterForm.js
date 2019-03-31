import React, { Component } from "react"
// import { Button } from 'reactstrap'
import UserManager from '../../modules/UserManager'
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Form, FormGroup } from 'reactstrap'


export default class Register extends Component {

     // Set initial state
     constructor(props) {
      super(props)
      this.state = {
        firstName: "",
        lastName: "",
        password: "",
        username: "",
        emptyModal: false,
        emailModal: false
    }

      this.toggleEmptyFieldModal = this.toggleEmptyFieldModal.bind(this)
      this.toggleEmailModal = this.toggleEmailModal.bind(this)
  }

  toggleEmptyFieldModal() {
    this.setState(prevState => ({
      emptyModal: !prevState.emptyModal
    }))
  }

  toggleEmailModal() {
    this.setState(prevState => ({
      emailModal: !prevState.emailModal
    }))
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
          plainPassword: this.state.password
        }
        if (this.state.email && this.state.password && this.state.firstName && this.state.lastName) {
          UserManager.register(newUser, "register").then(user => {
            sessionStorage.setItem("credentials", user.token)
            this.props.setAuth()
          })
          .then(() => this.props.history.push("/"))
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
      <Modal isOpen={this.state.emailModal} toggle={this.toggleEmailModal} className={this.props.className}>
        <ModalHeader toggleEmailModal={this.toggleEmailModal}>Oops!</ModalHeader>
        <ModalBody>
            This email is already in use!
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggleEmailModal}>OK</Button>
        </ModalFooter>
      </Modal>

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
              <Label for="password">Password</Label>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                id="password"
                placeholder="**********"
                required=""
              />
            </FormGroup>
          </Col>
          {/* TODO CONFIRM PASSWORD */}
          {/* <Col>
            <FormGroup>
              <Label for="confirmPassword">Confirm Password</Label>
              <Input
                onChange={this.handleFieldChange}
                type="password"
                id="confirmPassword"
                placeholder="**********"
                required=""
              />
            </FormGroup>
          </Col> */}
          <Button color="info" type="submit" onClick={this.handleRegister}>
            Register
          </Button>
        </Form>
      </div>


</div>
    )
}
}
