import React, { Component } from "react"
import "../../globalStyles.css"
import { Button } from 'reactstrap'


export default class SessionForm extends Component {
    // Set initial state
  state = {
    userId: "",
    animalId: "",
    date: "",
    sessionId: "",
    behaviorId: "",
    rating: "",
    notes: ""
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
    if (this.state.animalId === "") {
      window.alert("Please choose an animal to train")
    }else {
      const session = {
        userId: this.props.activeUser.id,
        animalId: parseInt(this.state.animalId),
        date: this.state.date
      }

      // Create the animal
      this.props
        .addSession(session)
        .then((sessionObj) => this.setState({sessionId: sessionObj.id}))
        .then(() => document.querySelector("#trainingForm").classList.toggle("hidden"))
    }
  }

  constructNewSessionBehavior = evt => {
    evt.preventDefault()
    // Ensure behavior & rating are filled in. Notes are optional.
    if (this.state.behaviorId === "" || this.state.rating === "") {
        window.alert("Please choose and rate a behavior")
    }else {
        const sessionBehavior = {
            sessionId: this.state.sessionId,
            behaviorId: parseInt(this.state.behaviorId),
            rating: parseInt(this.state.rating),
            notes: this.state.notes
        }
        // Check which button was clicked
        if (evt.target.id === "finishSession"){
        // Create the session behavior and redirect user to animal list
        this.props
            .addSessionBehavior(sessionBehavior)
            .then(() => this.props.history.push("/sessions"))
        } else if(evt.target.id === "trainAgain") {
            // Create the session behavior but remain on page and clear form for re-use
            this.props.addSessionBehavior(sessionBehavior)
            document.querySelector("#trainingForm").reset()
            this.setState({notes: ""})
        }

    }
  }

  render() {
    return (
      <React.Fragment>

          {/* session form */}
        <form className="sessionForm" id="sessionForm">
        <div className="form-group">
            <label htmlFor="animal">Animal to Train</label>
            <select
              defaultValue=""
              name="animal"
              id="animalId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select an animal</option>
              {this.props.animals.map(a => (
                <option key={a.id} id={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="date"
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
        <form className="trainingForm hidden" id="trainingForm">
        <div className="form-group">
            <label htmlFor="behavior">Behavior</label>
            <select
              required
              defaultValue=""
              name="behavior"
              id="behaviorId"
              onChange={this.handleFieldChange}
            >
              <option value="">Select a behavior</option>
              { //Filter behaviors available for current animal
                this.props.assignedBehaviors.filter(behavior => behavior.animalId === parseInt(this.state.animalId))
                  .map(b => (<option key={b.behavior.id} id={b.behavior.id} value={b.behavior.id}>{b.behavior.name}</option>))
              }
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <select
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
            </select>
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
          <Button color="secondary"
            type="submit"
            onClick={this.constructNewSessionBehavior}
            id="trainAgain"
          >
            Add & Train Another!
          </Button>
          <Button color="info"
            type="submit"
            onClick={this.constructNewSessionBehavior}
            className="btn btn-primary"
            id="finishSession"
          >
            Finish Session
          </Button>
        </form>
      </React.Fragment>
    )
  }
}