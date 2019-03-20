import React, { Component } from "react"
import { Button, FormGroup, Input } from 'reactstrap'

export default class BehaviorList extends Component {

    // Set initial state
    state = {
        behaviorId: ""
    }

    // Update state whenever an input field is edited
    handleFieldChange = evt => {
        const stateToChange = {}
        stateToChange[evt.target.id] = evt.target.value
        this.setState(stateToChange)
    }

    constructNewAssignedBehavior = evt => {
        evt.preventDefault()
        // Ensure a behavior has been chosen from the dropdown
        if (this.state.behaviorId === "") {
            window.alert("Please choose a behavior to add")
        } else {
          const assignedBehavior = {
            animalId: this.props.animal.id,
            behaviorId: parseInt(this.state.behaviorId)
          }

          // Create the behavior
          this.props
            .addAssignedBehavior(assignedBehavior)
          this.setState({behaviorId: ""})
        }
      }

      componentDidMount() {
        this.setState({
                behaviorId: ""
        })
        }

    render() {

        let thisAnimalsBehaviors = this.props.assignedBehaviors.filter(behavior => behavior.animalId === this.props.animal.id)
        let behaviorNameArray = thisAnimalsBehaviors.map(behavior => behavior.behavior.name)

        return (

            <React.Fragment>
                {/* Filter out current animal's behaviors, make list item for each */}
                {
                    thisAnimalsBehaviors
                        .map(behavior => {
                            return <div key={behavior.id} className="behaviorListItem">
                                <div>{behavior.behavior.name}</div>
                                <Button color="secondary"
                                    type="button"
                                    className="btn animalBehaviorBtn"
                                    onClick={() => {
                                        let confirm = window.confirm("Are you sure you want to remove this behavior?")
                                        if (confirm === true) {
                                            this.props.deleteAssignedBehavior(behavior.id)
                                        }
                                    }}
                                ><i className="fas fa-minus"></i></Button>
                            </div>
                        })
                }

                {/* dropdown to add behaviors to animal */}

                <FormGroup className="behaviorListItem">
                    <Input defaultValue="" type="select" name="behavior" id="behaviorId" onChange={this.handleFieldChange}>
                        <option value="">Add A Behavior</option>
                        {
                        this.props.behaviors
                            // Sort behaviors alphabetically by name
                            .sort((a, b) => {
                                var nameA = a.name.toUpperCase() // ignore upper and lowercase
                                var nameB = b.name.toUpperCase() // ignore upper and lowercase
                                if (nameA < nameB) {
                                    return -1;
                                }
                                if (nameA > nameB) {
                                    return 1;
                                }})
                            .map(b => {
                                // Only show behaviors that don't already exist on that animal
                                if (behaviorNameArray.includes(b.name) === false) {
                                return <option key={b.id} id={b.id} value={b.id}>{b.name}</option>
                            }})
                        }
                    </Input>
                    <Button color="info"
                        id="animalAddBehavior"
                        type="button"
                        className="btn btn-success animalBehaviorBtn"
                        onClick={this.constructNewAssignedBehavior}
                    ><i class="fas fa-plus"></i></Button>
                </FormGroup>

            </React.Fragment>
        )
    }
}