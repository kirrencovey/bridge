import React, { Component } from "react"
import BehaviorList from "../behavior/BehaviorList(OneAnimal)"
import SessionList from "../sessions/SessionList(OneAnimal)"
import { Button } from 'reactstrap'



export default class AnimalDetail extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
      }

    render() {
        // Get animal id from params
        const animal = this.props.animals.find(a => a.id === parseInt(this.props.match.params.animalId)) || {}

        return (
            <div className="cardContainer pageContents">
                <div className="card animalCard">
                <div className="cardHeading">
                    <h2>{animal.name}</h2>
                    <div className="cardSubtitle">{animal.species}</div>
                </div>
                <img className="detailImage" src={animal.image} alt="animal" />
                <h5>Notes</h5>
                {animal.notes}<br/>
                <Button color="info"
                    className="btn-edit-animal-details"
                    type="button"
                    onClick={() => {
                        this.props.history.push(`/animals/${animal.id}/edit`)
                    }}
                    ><i className="fas fa-edit"></i></Button>
                    </div>
                <div className="card animalCard">
                <h5>Behaviors</h5>
                <BehaviorList animal={animal}
                        addAssignedBehavior={this.props.addAssignedBehavior}
                        deleteAssignedBehavior={this.props.deleteAssignedBehavior}
                        behaviors={this.props.behaviors}
                        assignedBehaviors={this.props.assignedBehaviors}/>
                </div>
                <div className="card animalSessionCard">
                <h5>Training History</h5>
                <SessionList animal={animal}
                        history={this.props.history}
                        sessions={this.props.sessions}
                        sessionBehaviors={this.props.sessionBehaviors}
                        deleteSession={this.props.deleteSession} />
                        </div>
            </div>
        )
    }
}