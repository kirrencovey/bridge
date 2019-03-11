import React, { Component } from "react"

export default class AnimalCard extends Component {
    render() {
        return (
            <React.Fragment>
                <h2>{this.props.animal.name}</h2>
                {this.props.animal.species}<br/>
                <img src={this.props.animal.image}></img><br/>
                <button
                    type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push(`/animals/${this.props.animal.id}`)
                    }}
                    >Details</button>
            </React.Fragment>
        )
    }
}