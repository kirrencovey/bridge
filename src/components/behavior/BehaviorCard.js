import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export default class BehaviorCard extends Component {

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
                        Are you sure you want to delete this behavior?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="info" onClick={() => {
                            this.props.deleteBehavior(this.props.behavior.id)
                            this.toggle()
                        }}>Delete</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                <div className="cardTitle">{this.props.behavior.name}</div>
                <div>{this.props.behavior.summary}</div>
                <div className="btnContainer">
                <Button color="info"
                    type="button"
                    className="btn-edit"
                    onClick={() => {
                        this.props.history.push(`/behaviors/${this.props.behavior.id}/edit`)
                    }}
                ><i className="fas fa-edit"></i></Button>
                <Button color="secondary"
                    type="button"
                    className=".btn-delete"
                    onClick={() => {
                        this.toggle()
                    }}
                ><i className="fas fa-trash-alt"></i></Button>
                </div>
            </React.Fragment>
        )
    }
}