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
                    <div className="date">{new Date(session.date).toDateString()}</div>
                </div>
                {
                    thisSessionBehaviors.map(sb =>
                        <div className="innerCard" key={sb.id}>
                            <div className="cardHeading behaviorCardHeading">
                            <div className="cardTitle">{sb.behavior.name}</div>
                            <div className="cardTitle">{sb.rating}/5</div>
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
