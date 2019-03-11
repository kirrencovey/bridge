import React, { Component } from "react"

export default class SessionCard extends Component {
    render() {
        return (
            <React.Fragment>
                One Session Summary
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