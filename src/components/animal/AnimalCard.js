import React, { Component } from "react"
import { Button } from 'reactstrap'

export default class AnimalCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="cardHeading">
                    <div className="cardTitle">{this.props.animal.name}</div>
                    <div className="cardSubtitle">{this.props.animal.species}</div>
                </div>
                    <img className="cardImage" src={this.props.animal.image} />
                <div className="btnContainer">
                <Button color="info"
                    type="button"
                    onClick={() => {
                        this.props.history.push(`/animals/${this.props.animal.id}`)
                    }}
                >Details</Button>
                <Button color="secondary"
                    type="button"
                    onClick={() => {
                        let confirm = window.confirm("Are you sure you want to delete this animal? Doing so will delete all associated training records.")
                        if (confirm === true) {
                            this.props.deleteAnimal(this.props.animal.id)
                        }
                    }}
                >Delete</Button>
                </div>
            </React.Fragment>
        )
    }
}