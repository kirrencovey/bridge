import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';


export default class BehaviorForm extends Component {

// Set initial state
constructor(props) {
  super(props)
  this.state = {
    userId: "",
    behaviorName: "",
    summary: "",
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
constructNewBehavior = evt => {
  evt.preventDefault()
  // Ensure name & summary are filled in.
  if (this.state.behaviorName === "" || this.state.summary === "") {
    this.toggle()
  }else {
    const behavior = {
      userId: this.props.activeUser.id,
      name: this.state.behaviorName,
      summary: this.state.summary
    }

    // Create the behavior and redirect user to behavior list
    this.props
      .addBehavior(behavior)
      .then(() => this.props.history.push("/behaviors"))
  }
}

render() {
  return (
    <React.Fragment>
      <div className="animalForm pageContents">
        <div className="formContainer">
      <h2 className="formTitle">New Behavior</h2>

      {/* error modal */}
      <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
        <ModalHeader toggle={this.toggle}>Oops!</ModalHeader>
        <ModalBody>
            Behavior name and summary are both required.
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={this.toggle}>OK</Button>
        </ModalFooter>
      </Modal>

        <div className="form-group">
          <label htmlFor="behaviorName">Name</label>
          <input
            type="text"
            required
            className="form-control"
            onChange={this.handleFieldChange}
            id="behaviorName"
            placeholder="Name"
          />
        </div>
        <div className="form-group">
          <label htmlFor="summary">Summary & Notes</label>
          <textarea
            className="form-control"
            onChange={this.handleFieldChange}
            id="summary"
            placeholder="Summary of behavior, tools needed, visual or verbal cues to be used, etc"
          />
        </div>
        <Button color="info"
          type="submit"
          onClick={this.constructNewBehavior}
          className="btn btn-primary"
        >
          Submit
        </Button>
      </div>
      </div>
    </React.Fragment>
  )
}
}