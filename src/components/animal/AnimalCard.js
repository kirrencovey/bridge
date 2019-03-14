import React, { Component } from "react"
import { Button } from 'reactstrap'

export default class AnimalCard extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>{this.props.animal.name}</h2>
                {this.props.animal.species}<br/>
                {this.props.animal.image}<br/>
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
            </React.Fragment>
        )
    }
}