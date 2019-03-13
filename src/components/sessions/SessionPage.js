import React, { Component } from "react"
import SessionCard from "./SessionCard";

export default class SessionPage extends Component {
    render() {
        console.log(this.props.sessions)
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</button>
                {
                    this.props.sessions.sort(function (newsA, newsB) {
                        return new Date(newsB.date) - new Date(newsA.date)})
                        .map(session =>
                            <div key={session.id}>
                                <SessionCard session={session}
                                    history={this.props.history}
                                    sessionBehaviors={this.props.sessionBehaviors}
                                    deleteSession={this.props.deleteSession} />
                            </div>)
                }
            </React.Fragment>
        )
    }
}