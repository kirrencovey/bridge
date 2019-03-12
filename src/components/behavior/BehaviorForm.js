import React, { Component } from "react"

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
  constructNewAnimal = evt => {
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
        <form className="behaviorForm">
          <div className="form-group">
            <label htmlFor="behaviorName">Behavior name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="behaviorName"
              placeholder="Behavior name"
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
          <button
            type="submit"
            onClick={this.constructNewAnimal}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    )
  }
}