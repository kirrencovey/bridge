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
                    }>Add New Animal</button><br/>

                {/* Filter out current user's animals */}
                <section className="animalCardSection"></section>

                {
                    this.props.animals.filter(animal => animal.userId === this.props.activeUser.id)
                        .map(animal =>
                            <div className="animal" key={animal.id}>
                                <AnimalCard animal={animal}
                                        history={this.props.history}
                                        /* activeUser={this.props.activeUser} */ />
                            </div>
                    )
                }

            </React.Fragment>
        )
    }
}