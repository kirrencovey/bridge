import React, { Component } from "react"
import TrainedBehaviorCard from "../behavior/TrainedBehaviorCard"
import { Button } from 'reactstrap'


export default class SessionList extends Component {
    render() {
        return (
            <React.Fragment>
                {/* Filter out current animal's sessions, make card for each */}
                {
                    this.props.sessions.filter(session => session.animalId === this.props.animal.id)
                    .sort((sessionA, sessionB) => new Date(sessionB.date) - new Date(sessionA.date))
                        .map(session => <div className="innerCard" key={session.id}>
                                <div className="date">{new Date(session.date).toDateString()}</div>
                                <TrainedBehaviorCard session={session}
                                        history={this.props.history}
                                        sessionBehaviors={this.props.sessionBehaviors}
                                        deleteSession={this.props.deleteSession} />
                            </div>)
                }
                <Button color="info"
                    type="button"
                    className="btn btn-success addBtn"
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</Button>  {/* TODO this button routes to new session - but can i pass this animal to have form & state pre-filled when clicked from details page?? */}
            </React.Fragment>
        )
    }
}
