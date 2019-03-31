import React, { Component } from "react"
import BehaviorManager from "../../modules/BehaviorManager"
import { Button } from 'reactstrap'


export default class BehaviorEdit extends Component {
// Set initial state
state = {
    userId: "",
    behaviorName: "",
    summary: "",
    id: parseInt(this.props.match.params.behaviorId)
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
    updateExistingBehavior = evt => {
    evt.preventDefault()
    // Ensure name & summary are filled in.
    if (this.state.behaviorName === "" || this.state.summary === "") {
        window.alert("Please enter the behavior name and summary")
    }else {
        const editedBehavior = {
        id: this.props.match.params.behaviorId,
        userId: this.props.activeUser.id,
        name: this.state.behaviorName,
        summary: this.state.summary
        }

        // Create the behavior and redirect user to behavior list
        this.props
        .updateBehavior(editedBehavior)
        .then(() => this.props.history.push("/behaviors"))
    }
    }

    componentDidMount() {
        console.log(this.props.match.params.behaviorId)
    BehaviorManager.get(this.props.match.params.behaviorId, "behaviors")
    .then(behavior => {
        this.setState({
            behaviorName: behavior.name,
            summary: behavior.summary,
            userId: behavior.userId
        })
    })
    }

    render() {
    return (
        <React.Fragment>
        <div className="animalForm pageContents">
        <div className="formContainer">
            <h2 className="formTitle">Edit Behavior</h2>
            <div className="form-group">
            <label htmlFor="behaviorName">Name</label>
            <input
                type="text"
                required
                className="form-control"
                onChange={this.handleFieldChange}
                id="behaviorName"
                value={this.state.behaviorName}
            />
            </div>
            <div className="form-group">
            <label htmlFor="summary">Summary & Notes</label>
            <textarea
                className="form-control"
                onChange={this.handleFieldChange}
                id="summary"
                value={this.state.summary}
            />
            </div>
            <Button color="info"
            type="submit"
            onClick={this.updateExistingBehavior}
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