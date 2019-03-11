import React, { Component } from "react"

export default class SessionList extends Component {
    render() {
        return (
            <React.Fragment>
                <div>
                {/* Filter out current animal's sessions, make card for each */}
                {
                    this.props.sessionBehaviors.filter(sessionBehavior => sessionBehavior.session.animalId === this.props.animal.id)
                        .map(sessionBehavior => <div key={sessionBehavior.id}>
                                {sessionBehavior.session.date}<br/>
                                {sessionBehavior.behavior.name}, {sessionBehavior.rating}/5<br/>
                                {sessionBehavior.notes}
                            </div>)
                }
                </div>
                <button type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</button>
            </React.Fragment>
        )
    }
}