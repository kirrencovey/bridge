import React, { Component } from "react"
import TrainedBehaviorCard from "../behavior/TrainedBehaviorCard";

export default class SessionCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div>{this.props.session.date}</div>
                <div className="cardContents">
                    <div className="cardTitle">{this.props.session.animal.name}</div>
                    <div className="cardSubtitle">{this.props.session.animal.species}</div>
                </div>
                <TrainedBehaviorCard session={this.props.session}
                    history={this.props.history}
                    sessionBehaviors={this.props.sessionBehaviors}
                    deleteSession={this.props.deleteSession} />
            </React.Fragment>
        )
    }
}