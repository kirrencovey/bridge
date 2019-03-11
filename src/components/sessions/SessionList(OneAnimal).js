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
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</button>
            </React.Fragment>
        )
    }
}







    {/* THIS CODE WILL DISPLAY EACH TRAINED BEHAVIOR WITH DATE, NAME, RATING, NOTES
        BUT I DECIDED TO START WITH A CARD FOR EACH WHOLE SESSION INSTEAD
        {
        this.props.sessionBehaviors.filter(sessionBehavior => sessionBehavior.session.animalId === this.props.animal.id)
            .map(sessionBehavior => <div key={sessionBehavior.id}>
                    {sessionBehavior.session.date}<br/>
                    {sessionBehavior.behavior.name}, {sessionBehavior.rating}/5<br/>
                    {sessionBehavior.notes}
                </div>)
    } */}