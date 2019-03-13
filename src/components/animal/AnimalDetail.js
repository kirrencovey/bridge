import React, { Component } from "react"
import BehaviorList from "../behavior/BehaviorList(OneAnimal)"
import SessionList from "../sessions/SessionList(OneAnimal)"
import { Button } from 'reactstrap'



export default class AnimalDetail extends Component {
    render() {
        // Get animal id from params
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}

        return (
            <React.Fragment>
                <h2>{animal.name}</h2>
                {animal.species}<br/>
                {animal.image}<br/>
                <h6>Notes</h6>
                {animal.notes}<br/>
                <Button color="info"
                    type="button"
                    onClick={() => {
                        this.props.history.push(`/animals/${animal.id}/edit`)
                    }}
                    >Edit Details</Button>
                <h6>Behaviors</h6>
                <BehaviorList animal={animal}
                        addAssignedBehavior={this.props.addAssignedBehavior}
                        deleteAssignedBehavior={this.props.deleteAssignedBehavior}
                        behaviors={this.props.behaviors}
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