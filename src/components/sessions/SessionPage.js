import React, { Component } from "react"
import SessionCard from "./SessionCard"
import { Button } from 'reactstrap'


export default class SessionPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Button color="info"
                    type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start a Session</Button>
                {
                    this.props.sessions.sort((sessionA, sessionB) => {
                        return new Date(sessionB.date) - new Date(sessionA.date)})
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