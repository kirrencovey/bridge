import React, { Component } from "react"

export default class SessionDetail extends Component {
    render() {

        // Get session id from params
        const session = this.props.sessions.find(s => s.id === parseInt(this.props.match.params.sessionId)) || {}
        const animal = session.animal || {}
        const thisSessionBehaviors = this.props.sessionBehaviors.filter(sb => sb.sessionId === session.id)
        console.log(thisSessionBehaviors)

        return (
            <React.Fragment>
                {session.date}<br/>
                <h2>{animal.name}</h2>
                {
                    thisSessionBehaviors.map(sb =>
                        <div key={sb.id}>
                            {sb.behavior.name}, {sb.rating}/5
                            <br/>
                            {sb.notes}
                        </div>
                    )
                }
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/sessions/${session.id}/edit`)
                    }}
                    >Edit</button>
            </React.Fragment>
        )
    }
}