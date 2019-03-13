import React, { Component } from "react"

export default class AnimalCard extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>{this.props.animal.name}</h2>
                {this.props.animal.species}<br/>
                {this.props.animal.image}<br/>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/animals/${this.props.animal.id}`)
                    }}
                    >Details</button>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        let confirm = window.confirm("Are you sure you want to delete this animal? Doing so will delete all associated training records.")
                        if (confirm === true) {
                            this.props.deleteAnimal(this.props.animal.id)
                        }
                    }}
                >Delete</button>
            </React.Fragment>
        )
    }
}