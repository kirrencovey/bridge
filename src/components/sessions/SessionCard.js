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
                    history={this.props.history}
                    sessionBehaviors={this.props.sessionBehaviors} />
            </React.Fragment>
        )
    }
}