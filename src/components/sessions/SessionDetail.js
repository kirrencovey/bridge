import React, { Component } from "react"
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap'


export default class SessionDetail extends Component {

    // Set initial state
  constructor(props) {
    super(props)
    this.state = {
      sessionBehaviorId: "",
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

        // Get session id from params
        const session = this.props.sessions.find(s => s.id === parseInt(this.props.match.params.sessionId)) || {}
        const animal = session.animal || {}
        const thisSessionBehaviors = this.props.sessionBehaviors.filter(sb => sb.sessionId === session.id)


        return (
            <React.Fragment>

            {/* confirm delete modal */}
            <Modal isOpen={this.state.modal} toggle={this.toggle} >
                <ModalHeader toggle={this.toggle}>Wait!</ModalHeader>
                <ModalBody>
                    Are you sure you want to delete this behavior from this session?
                </ModalBody>
                <ModalFooter>
                <Button color="info" onClick={() => {
                        this.props.deleteSessionBehavior(this.state.sessionBehaviorId)
                        this.toggle()
                    }}>Delete</Button>
                <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>

            <div className="cardContainer">
                <div className="card">
                <div className="cardContents">
                    <div className="cardTitle">{animal.name}</div>
                    <div className="date">{session.date}</div>
                </div>
                {
                    thisSessionBehaviors.map(sb =>
                        <div className="innerCard" key={sb.id}>
                            <div className="cardHeading behaviorCardHeading">
                            <div className="cardTitle">{sb.behavior.name}</div>
                            <div className="cardTitle">{sb.rating}/5</div>
                            </div>
                            <div>{sb.notes}</div>
                            <div className="btnContainer">
                                <Button color="info"
                                    className="btn-details btn-edit-session-details"
                                    type="button"
                                    onClick={() => {
                                        this.props.history.push(`/sessions/${sb.id}/edit`)
                                    }}
                                ><i className="fas fa-edit"></i></Button>
                                <Button color="secondary"
                                    type="button"
                                    className=".btn-delete"
                                    id={sb.id}
                                    onClick={(evt) => {
                                        // Set state of behaviorId of the correct behavior from button id, when clicked
                                        this.setState({sessionBehaviorId: evt.target.parentElement.id})
                                        this.toggle()
                                    }}
                                ><i className="fas fa-trash-alt"></i></Button>
                            </div>
                        </div>
                    )
                }
                </div>
            </div>
        </React.Fragment>
        )
    }
}