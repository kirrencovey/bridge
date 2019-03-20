import React, { Component } from "react"
import { Button } from 'reactstrap'


export default class TrainedBehaviorCard extends Component {
    render() {
        return (
            <React.Fragment>
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
                        let confirm = window.confirm("Are you sure you want to delete this session?")
                        if (confirm === true) {
                            this.props.deleteSession(this.props.session.id)
                        }
                    }}
                ><i className="fas fa-trash-alt"></i></Button>
                </div>
            </React.Fragment>
        )
    }
}