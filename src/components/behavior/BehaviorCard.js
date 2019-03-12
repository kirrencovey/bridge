import React, { Component } from "react"

export default class BehaviorCard extends Component {
    render() {
        return (
            <React.Fragment>
                <h5>{this.props.behavior.name}</h5>
                {this.props.behavior.summary}<br/>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/behaviors/${this.props.behavior.id}/edit`)
                    }}
                    >Edit</button>
            </React.Fragment>
        )
    }
}