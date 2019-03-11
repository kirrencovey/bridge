import React, { Component } from "react"
import AnimalCard from "./AnimalCard"

export default class AnimalList extends Component {
    render() {
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</button>
                List of user's animals<br/>
                <AnimalCard />
            </React.Fragment>
        )
    }
}