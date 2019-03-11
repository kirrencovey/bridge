import React, { Component } from "react"

export default class AnimalDetail extends Component {
    render() {
        return (
            <React.Fragment>
                Animal detail page<br/>
                image<br/>
                notes<br/>
                behaviors w/add button
                {/* <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/animals/${this.props.animal.id}/edit`)
                    }}
                    >Edit</button> */}
            </React.Fragment>
        )
    }
}