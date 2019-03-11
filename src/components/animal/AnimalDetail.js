import React, { Component } from "react"

export default class AnimalDetail extends Component {
    render() {
        // Get animal id from params
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}

        return (
            <React.Fragment>
                <h2>{animal.name}</h2>
                {animal.species}<br/>
                <img src={animal.image}></img><br/>
                <h6>Notes</h6>
                {animal.notes}
                <h6>Behaviors</h6>
                <h6>Training Session History</h6>
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