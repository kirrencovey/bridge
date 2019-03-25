import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'

export default class AnimalCard extends Component {

    // Set initial state
  constructor(props) {
    super(props)
    this.state = {
      modal: false
  }

    this.toggle = this.toggle.bind(this)
  }

toggle() {
  this.setState(prevState => ({
    modal: !prevState.modal
  }))
}

    render() {
        return (
            <React.Fragment>

                {/* confirm delete modal */}
                <Modal isOpen={this.state.modal} toggle={this.toggle} >
                    <ModalHeader toggle={this.toggle}>Wait!</ModalHeader>
                    <ModalBody>
                        Are you sure you want to delete this animal? Doing so will delete all associated training records.
                    </ModalBody>
                    <ModalFooter>
                    <Button color="info" onClick={() => {
                            this.props.deleteAnimal(this.props.animal.id)
                            this.toggle()
                        }}>Delete</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div className="cardContents">
                    <img className="cardImage" src={this.props.animal.image} />
                    <div className="cardTextContents">
                        <div className="cardTitle">{this.props.animal.name}</div>
                        <div className="cardSubtitle">{this.props.animal.species}</div>
                        <div className="btnContainer">
                            <Button color="info"
                                className="btn-details"
                                type="button"
                                onClick={() => {
                                    this.props.history.push(`/animals/${this.props.animal.id}`)
                                }}
                            >Details</Button>
                            <Button color="secondary"
                                className="btn-delete"
                                type="button"
                                onClick={() => {
                                    this.toggle()
                                }}
                            ><i className="fas fa-trash-alt"></i></Button>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}