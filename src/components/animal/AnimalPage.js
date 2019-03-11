import React, { Component } from "react"
import AnimalCard from "./AnimalCard"

export default class AnimalPage extends Component {
    render() {
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</button><br/>

                <section className="animalCardSection"></section>

                {/* Filter out current user's animals, make animal card for each */}
                {
                    this.props.animals.filter(animal => animal.userId === this.props.activeUser.id)
                        .map(animal =>
                            <div className="animal" key={animal.id}>
                                <AnimalCard animal={animal}
                                        history={this.props.history} />
                            </div>
                    )
                }

            </React.Fragment>
        )
    }
}