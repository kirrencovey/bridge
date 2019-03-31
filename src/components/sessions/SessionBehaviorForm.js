import React, { Component } from "react"
import "../../globalStyles.css"
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'



export default class SessionBehaviorForm extends Component {
    // Set initial state
    constructor(props) {
      super(props)
      this.state = {
        userId: "",
        animalId: "",
        date: "",
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


  constructNewSessionBehavior = evt => {
    evt.preventDefault()
    // Ensure behavior & rating are filled in. Notes are optional.
    if (this.state.behaviorId === "" || this.state.rating === "") {
        this.toggle()
    }else {
        const sessionBehavior = {
            sessionId: this.props.sessionId,
            behaviorId: parseInt(this.state.behaviorId),
            rating: parseInt(this.state.rating),
            notes: this.state.notes
        }
        // Check which button was clicked
        if (evt.target.id === "finishSession"){
        // Create the session behavior and redirect user to animal list
        this.props
            .addSessionBehavior(sessionBehavior)
            .then(() => {
                this.props.history.push(`/animals/${this.props.animalId}`)
            })
        } else if(evt.target.id === "trainAgain") {
            // Create the session behavior but remain on page and clear form for re-use
            this.props.addSessionBehavior(sessionBehavior)
            document.querySelector(".trainingForm").reset()
            this.setState({notes: ""})
        }

    }
  }

  render() {
    return (
      <React.Fragment>

        {/* sessionBehavior Form */}
        <form className="formContainer trainingForm" id="trainingForm">
        <h2 className="formTitle">Training {this.props.animalName}</h2>

        {/* error modal */}
        <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
          <ModalHeader toggle={this.toggle}>Oops!</ModalHeader>
          <ModalBody>
              Please choose and rate a behavior.
          </ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggle}>OK</Button>
          </ModalFooter>
        </Modal>

        <div className="form-group">
            <label htmlFor="behavior">Behavior</label>
            <Input
              type="select"
              required
              defaultValue=""
              name="behavior"
              id="behaviorId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a Behavior</option>
              { //Filter behaviors available for current animal
                this.props.assignedBehaviors.filter(behavior => behavior.animalId === parseInt(this.props.animalId))
                  // Sort behaviors alphabetically by name
                  .sort((a, b) => {
                    var nameA = a.behavior.name.toUpperCase() // ignore upper and lowercase
                    var nameB = b.behavior.name.toUpperCase() // ignore upper and lowercase
                    if (nameA < nameB) {
                        return -1;
                    }
                    if (nameA > nameB) {
                        return 1;
                    }})
                  .map(b => {
                      return (<option key={b.behavior.id} id={b.behavior.id} value={b.behavior.id}>{b.behavior.name}</option>)
                  })
              }
            </Input>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <Input
              type="select"
              required
              defaultValue=""
              name="rating"
              id="rating"
              onChange={this.handleFieldChange}
            >
              <option value="">1-5</option>
                <option key="1" id="1" value="1">1</option>
                <option key="2" id="2" value="2">2</option>
                <option key="3" id="3" value="3">3</option>
                <option key="4" id="4" value="4">4</option>
                <option key="5" id="5" value="5">5</option>
            </Input>
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeholder="Any notes?"
            />
          </div>
          <div className="btnContainer">
          <Button color="secondary"
            type="submit"
            onClick={this.constructNewSessionBehavior}
            id="trainAgain"
          >
            Another Behavior!
          </Button>
          <Button color="info"
            type="submit"
            onClick={this.constructNewSessionBehavior}
            className="btn btn-primary"
            id="finishSession"
          >
            Finish Session
          </Button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}
