import React, { Component } from "react"
import SessionCard from "./SessionCard";

export default class SessionPage extends Component {
    render() {
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</button>
                {
                    this.props.sessions.filter(session => session.userId === this.props.activeUser.id)
                        .map(session =>
                            <div key={session.id}>
                                <SessionCard session={session}
                                    history={this.props.history}
                                    sessionBehaviors={this.props.sessionBehaviors}/>
                            </div>)
                }
            </React.Fragment>
        )
    }
}