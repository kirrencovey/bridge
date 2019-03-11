import React, { Component } from "react"
import TrainedBehaviorCard from "../behavior/TrainedBehaviorCard";

export default class SessionCard extends Component {
    render() {
        return (
            <React.Fragment>
                <h6>{this.props.session.date}</h6>
                <h5>{this.props.session.animal.name}</h5>
                <h6>{this.props.session.animal.species}</h6>
                <TrainedBehaviorCard session={this.props.session}
                    sessionBehaviors={this.props.sessionBehaviors} />
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/sessions/${this.props.session.id}/edit`)
                    }}
                    >Edit</button>
            </React.Fragment>
        )
    }
}