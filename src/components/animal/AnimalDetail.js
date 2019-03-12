import React, { Component } from "react"
import BehaviorList from "../behavior/BehaviorList(OneAnimal)"
import SessionList from "../sessions/SessionList(OneAnimal)"


export default class AnimalDetail extends Component {
    render() {
        // Get animal id from params
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}
        console.log(animal)

        return (
            <React.Fragment>
                <h2>{animal.name}</h2>
                {animal.species}<br/>
                {animal.image}<br/>
                <h6>Notes</h6>
                {animal.notes}<br/>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/animals/${animal.id}/edit`)
                    }}
                    >Edit Details</button>
                <h6>Behaviors</h6>
                <BehaviorList animal={animal}
                        assignedBehaviors={this.props.assignedBehaviors}/>
                <h6>Training History</h6>
                <SessionList animal={animal}
                        history={this.props.history}
                        sessions={this.props.sessions}
                        sessionBehaviors={this.props.sessionBehaviors}/>
            </React.Fragment>
        )
    }
}