import React, { Component } from "react"
import { Button } from 'reactstrap'


export default class BehaviorForm extends Component {

// Set initial state
state = {
  userId: "",
  behaviorName: "",
  summary: ""
};

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
    window.alert("Please enter the behavior name and summary")
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
      <form className="behaviorForm formContainer">
      <h2 className="formTitle">New Behavior</h2>
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
      </form>
    </React.Fragment>
  )
}
}