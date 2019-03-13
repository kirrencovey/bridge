import React, { Component } from "react"
import AnimalCard from "./AnimalCard"

export default class AnimalPage extends Component {
    render() {
        console.log(this.props.animals)
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</button><br/>

                <section className="animalCardSection"></section>

                {/* Filter out current user's animals, make animal card for each */}
                {
                    this.props.animals
                        // Sort animals alphabetically by name
                        .sort((a, b) => {
                            var nameA = a.name.toUpperCase() // ignore upper and lowercase
                            var nameB = b.name.toUpperCase() // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }})
                        .map(animal =>
                            <div key={animal.id}>
                                <AnimalCard animal={animal}
                                        history={this.props.history}
                                        deleteAnimal={this.props.deleteAnimal} />
                            </div>
                    )
                }

            </React.Fragment>
        )
    }
}