import React, { Component } from "react"
import AnimalCard from "./AnimalCard"
import { Button } from 'reactstrap'


export default class AnimalPage extends Component {
    render() {
        return (
            <section className="pageContents">
                <Button color="info"
                    type="button"
                    className="btn btn-success addBtn"
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</Button>

                <section className="cardContainer">

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
                            <div key={animal.id} className="card">
                                <AnimalCard animal={animal}
                                        history={this.props.history}
                                        deleteAnimal={this.props.deleteAnimal} />
                            </div>
                    )
                }
                </section>
            </section>
        )
    }
}