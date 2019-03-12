import React, { Component } from "react"
import TrainedBehaviorCard from "../behavior/TrainedBehaviorCard"

export default class SessionList extends Component {
    render() {
        return (
            <React.Fragment>
                {/* Filter out current animal's sessions, make card for each */}
                {
                    this.props.sessions.filter(session => session.animalId === this.props.animal.id)
                        .map(session => <div key={session.id}>
                                {session.date}<br/>
                                <TrainedBehaviorCard session={session}
                                        sessionBehaviors={this.props.sessionBehaviors}/>
                            </div>)
                }
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</button>  {/* TODO this button routes to new session - but can i pass this animal to have form & state pre-filled when clicked from details page?? */}
            </React.Fragment>
        )
    }
}