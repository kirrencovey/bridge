import React, { Component } from "react"

export default class SessionDetail extends Component {
    render() {
        return (
            <React.Fragment>
                Session detail page<br/>
                all behaviors from session with ratings and notes
                {/* <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/sessions/${this.props.session.id}/edit`)
                    }}
                    >Edit</button> */}
            </React.Fragment>
        )
    }
}