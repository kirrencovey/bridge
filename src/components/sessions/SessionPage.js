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
                List of user's training session history<br/>
                <SessionCard />
            </React.Fragment>
        )
    }
}