import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export default class TrainedBehaviorCard extends Component {

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
                        Are you sure you want to remove this training session from your records?
                    </ModalBody>
                    <ModalFooter>
                    <Button color="info" onClick={() => {
                            this.props.deleteSession(this.props.session.id)
                            this.toggle()
                        }}>Delete</Button>
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>

                {
                    this.props.sessionBehaviors.filter(sessionBehavior => sessionBehavior.sessionId === this.props.session.id)
                        .map(sessionBehavior => <div key={sessionBehavior.id}>
                                {sessionBehavior.behavior.name}, {sessionBehavior.rating}/5
                            </div>)
                }
                <div className="btnContainer">
                <Button color="info"
                    type="button"
                    className="btn-details"
                    onClick={() => {
                        this.props.history.push(`/sessions/${this.props.session.id}`)
                    }}
                    >Details</Button>
                    <Button color="secondary"
                    type="button"
                    className="btn-delete"
                    onClick={() => {
                        this.toggle()
                    }}
                ><i className="fas fa-trash-alt"></i></Button>
                </div>
            </React.Fragment>
        )
    }
}