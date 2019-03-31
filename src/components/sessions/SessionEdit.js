import React, { Component } from "react"
import SessionManager from "../../modules/SessionManager"
import { Button, Input } from 'reactstrap'

export default class SessionEdit extends Component {
// Set initial state
state = {
    animal: "",
    date: "",
    sessionId: "",
    behaviorId: "",
    behaviorName: "",
    rating: "",
    notes: "",
    id: parseInt(this.props.match.params.sessionId)
}

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
    }

    /*
    Local method for validation, creating animal object, and
    invoking the function reference passed from parent component
    */
    updateExistingSessionBehavior = evt => {
    evt.preventDefault()
    // Ensure name & summary are filled in.
    // if (this.state.behaviorName === "" || this.state.summary === "") {
    //     window.alert("Please enter the behavior name and summary")
    // }else {
        const editedSessionBehavior = {
        id: this.props.match.params.sessionId,
        sessionId: this.state.sessionId,
        behaviorId: this.state.behaviorId,
        rating: parseInt(this.state.rating),
        notes: this.state.notes
        }

        // Create the behavior and redirect user to behavior list
        this.props
        .updateSession(editedSessionBehavior)
        .then(() => this.props.history.push(`/sessions/${this.state.sessionId}`))
    }
    // }

    componentDidMount() {
    SessionManager.get(`${this.props.match.params.sessionId}?_expand=behavior`, "sessionBehaviors")
    .then(behavior => {
        this.setState({
            sessionId: behavior.sessionId,
            behaviorId: behavior.behaviorId,
            rating: behavior.rating,
            notes: behavior.notes,
            behaviorName: behavior.behavior.name
        })
    })
    .then(() => SessionManager.get(`${this.state.sessionId}?_expand=animal`, "sessions"))
    .then(session => {
        this.setState({
            animal: session.animal.name,
            date: session.date
        })
    })
    }

    render() {
    return (
        <React.Fragment>
        <form className="behaviorEditForm formContainer">
            <h2 className="formTitle">Edit Training Notes</h2>
            <div className="cardHeading">
                <div className="cardTitle">{this.state.animal}: {this.state.behaviorName}</div>
            </div>
                <div className="date">{this.state.date}</div><br />
            <div className="form-group">
            <label htmlFor="rating">Rating</label>
            <Input
              type="select"
              required
            //   placeholder={this.state.rating}
              value={this.state.rating}
              name="rating"
              id="rating"
              onChange={this.handleFieldChange}
            >
              {/* <option value="">1-5</option> */}
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
                value={this.state.notes}
            />
            </div>
            <Button color="info"
            type="submit"
            onClick={this.updateExistingSessionBehavior}
            className="btn btn-primary"
            >
            Submit
            </Button>
        </form>
        </React.Fragment>
    )
    }
}