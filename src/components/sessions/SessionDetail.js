import React, { Component } from "react"

export default class SessionDetail extends Component {
    render() {

        // Get session id from params
        const session = this.props.sessions.find(s => s.id === parseInt(this.props.match.params.sessionId)) || {}
        const animal = session.animal || {}
        const thisSessionBehaviors = this.props.sessionBehaviors.filter(sb => sb.sessionId === session.id)

        return (
            <div className="cardContainer">
                <div className="card">
                <div className="cardContents">
                    <div className="cardTitle">{animal.name}</div>
                    <div className="date">{session.date}</div>
                </div>
                {
                    thisSessionBehaviors.map(sb =>
                        <div className="innerCard" key={sb.id}>
                            <div className="behaviorCardHeading">{sb.behavior.name}: {sb.rating}/5
                            </div>
                            {sb.notes}
                        </div>
                    )
                }
                {/* <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/sessions/${session.id}/edit`)
                    }}
                    >Edit</button> */}
                    </div>
            </div>
        )
    }
}