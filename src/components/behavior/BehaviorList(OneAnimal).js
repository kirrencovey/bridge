import React, { Component } from "react"
import { Button, Input, Label, Modal, ModalHeader, ModalBody, ModalFooter, Container, Col, Form, FormGroup } from 'reactstrap'

export default class BehaviorList extends Component {

    // Set initial state
    constructor(props) {
        super(props)
        this.state = {
          behaviorId: "",
          addModal: false,
          deleteModal: false
      }
  
        this.toggleAddModal = this.toggleAddModal.bind(this)
        this.toggleDeleteModal = this.toggleDeleteModal.bind(this)
    }
  
    toggleAddModal() {
      this.setState(prevState => ({
        addModal: !prevState.addModal
      }))
    }
  
    toggleDeleteModal() {
      this.setState(prevState => ({
        deleteModal: !prevState.deleteModal
      }))
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
            this.toggleAddModal()
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

                {/* error modal */}
                <Modal isOpen={this.state.addModal} toggle={this.toggleAddModal} className={this.props.className}>
                    <ModalHeader toggleAddModal={this.toggleAddModal}>Oops!</ModalHeader>
                    <ModalBody>
                        Please choose a behavior to add
                    </ModalBody>
                    <ModalFooter>
                    <Button color="secondary" onClick={this.toggleAddModal}>OK</Button>
                    </ModalFooter>
                </Modal>
                {/* confirm delete modal */}
                <Modal behaviorId={this.state.behaviorId} isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal} >
                    <ModalHeader toggleDeleteModal={this.toggleDeleteModal}>Wait!</ModalHeader>
                    <ModalBody>
                        Are you sure you want to remove this behavior?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="info" onClick={() => {
                            this.props.deleteAssignedBehavior(this.state.behaviorId)
                            this.toggleDeleteModal()
                        }}>Delete</Button>
                    <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                    </ModalFooter>
                </Modal>


                {/* Filter out current animal's behaviors, make list item for each */}
                {
                    thisAnimalsBehaviors
                        .map(behavior => {
                            return <div  key={behavior.id} className="behaviorListItem">
                                <div>{behavior.behavior.name}</div>
                                <Button color="secondary"
                                    type="button"
                                    className="btn animalBehaviorBtn"
                                    id={behavior.id}
                                    onClick={(evt) => {
                                        // Set state of behaviorId of the correct behavior from button id, when clicked
                                        this.setState({behaviorId: evt.target.parentElement.id})
                                        this.toggleDeleteModal()
                                    }}
                                ><i className="fas fa-minus"></i></Button>

                                {/* confirm delete modal */}
                                {/* <Modal id={`delete--${behavior.id}`} isOpen={this.state.deleteModal} toggle={this.toggleDeleteModal} >
                                    <ModalHeader toggleDeleteModal={this.toggleDeleteModal}>Wait!</ModalHeader>
                                    <ModalBody>
                                        Are you sure you want to remove this behavior?
                                    </ModalBody>
                                    <ModalFooter>
                                    <Button color="info" onClick={() => {
                                            this.props.deleteAssignedBehavior(behavior.id)
                                            this.toggleDeleteModal()
                                        }}>Delete</Button>
                                    <Button color="secondary" onClick={this.toggleDeleteModal}>Cancel</Button>
                                    </ModalFooter>
                                </Modal> */}
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
                    ><i className="fas fa-plus"></i></Button>
                </FormGroup>

            </React.Fragment>
        )
    }
}