import React, { Component } from "react"
import "../../globalStyles.css"
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'
import SessionBehaviorForm from "./SessionBehaviorForm";



export default class SessionForm extends Component {
  
    // Set initial state
    constructor(props) {
      super(props)
      this.state = {
        userId: "",
        animalId: "",
        date: new Date().toISOString().substr(0, 10),
        sessionId: "",
        behaviorId: "",
        rating: "",
        notes: "" ,
        modal: false
      }
    
        this.toggle = this.toggle.bind(this)
    }
    
    toggle() {
      this.setState(prevState => ({
        modal: !prevState.modal
      }))
    }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  };

    /*
    Local method for validation, creating animal object, and
    invoking the function reference passed from parent component
    */
  constructNewSession = evt => {
    evt.preventDefault()
    // Ensure name & species are filled in. Notes and image are optional.
    if (this.state.animalId === "" || this.state.date === "") {
      this.toggle()
    }else {
      const session = {
        userId: this.props.activeUser.id,
        animalId: parseInt(this.state.animalId),
        date: this.state.date
      }

      // Create the session
      this.props
        .addSession(session)
        .then((sessionObj) => this.setState({sessionId: sessionObj.id}))
        .then(() => {
          // Set state of animal name for use on training form
          let animal = this.props.animals.find(a => a.id === parseInt(this.state.animalId))
          this.setState({ animalName: animal.name })
          // Show the training form
          document.querySelector("#trainingFormContainer").classList.toggle("hidden")
          // Hide the session form
          document.querySelector("#sessionForm").innerHTML=""
          document.querySelector("#sessionForm").classList.toggle("formContainer")
        })
    }
  }

  render() {
    return (
      <React.Fragment>

          {/* session form */}
        <form className="sessionForm formContainer" id="sessionForm">
        <h2 className="formTitle">New Training Session</h2>

        {/* error modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Oops!</ModalHeader>
          <ModalBody>
              Animal and date fields are both required!
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>OK</Button>
          </ModalFooter>
        </Modal>

        <div className="form-group">
            <label htmlFor="animal">Animal to Train</label>
            <Input
              type="select"
              defaultValue=""
              name="animal"
              id="animalId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an Animal</option>
              {this.props.animals
                // Sort animals alphabetically by name
                .sort((a, b) => {
                    var nameA = a.name.toUpperCase() // ignore upper and lowercase
                    var nameB = b.name.toUpperCase() // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }})
                .map(a => (
                  <option key={a.id} id={a.id} value={a.id}>
                    {a.name}
                  </option>
                ))
              }
            </Input>
          </div>
          <div className="form-group">

          <Label for="date">Date</Label>
          <Input
            required
            type="date"
            name="date"
            id="date"
            value={new Date().toISOString().substr(0, 10)}
            onChange={this.handleFieldChange}
          />

          </div>
          <Button color="info"
            type="submit"
            onClick={this.constructNewSession}
            className="btn btn-primary"
            id="startTraining"
          >
            Start Training!
          </Button>
        </form>



        {/* sessionBehavior Form */}
        <div className="hidden" id="trainingFormContainer">
        <SessionBehaviorForm
            animalId={this.state.animalId}
            animalName={this.state.animalName}
            behaviors={this.props.behaviors}
            assignedBehaviors={this.props.assignedBehaviors}
            sessionId={this.state.sessionId}
            addSessionBehavior={this.props.addSessionBehavior}
            addAssignedBehavior={this.props.addAssignedBehavior}
            history={this.props.history} />
        </div>
      </React.Fragment>
    )
  }
}
