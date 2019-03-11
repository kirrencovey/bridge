import React, { Component } from "react"

export default class AnimalCard extends Component {
    render() {
        return (
            <React.Fragment>
                One Animal
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