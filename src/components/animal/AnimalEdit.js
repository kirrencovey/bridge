import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager";

export default class AnimalEdit extends Component {
    // Set initial state
  state = {
    userId: "",
    animalName: "",
    species: "",
    notes:"",
    image: "",
    id: parseInt(this.props.match.params.animalId)
  }

  // Update state whenever an input field is edited
  handleFieldChange = evt => {
    const stateToChange = {}
    stateToChange[evt.target.id] = evt.target.value
    this.setState(stateToChange)
  }

    /*
    Local method for validation, creating animal object, and
    invoking the function reference passed from parent component
    */
  updateExistingAnimal = evt => {
    evt.preventDefault()
    // Ensure name & species are filled in. Notes and image are optional.
    if (this.state.animalName === "" || this.state.species === "") {
      window.alert("Please enter the animal's name and species")
    }else {
      const editedAnimal = {
        userId: this.props.activeUser.id,
        name: this.state.animalName,
        species: this.state.species,
        notes: this.state.notes,
        image: this.state.image,
        id: this.props.match.params.animalId
      }

      // Create the animal and redirect user to animal list
      this.props
        .updateAnimal(editedAnimal)
        .then(() => this.props.history.push("/animals"))
    }
  }

  componentDidMount() {
    AnimalManager.get(this.props.match.params.animalId, "animals")
    .then(animal => {
        this.setState({
            animalName: animal.name,
            species: animal.species,
            notes: animal.notes,
            image: animal.image,
            userId: animal.userId
        })
    })
    }

  render() {
    return (
      <React.Fragment>
        <form className="animalEditForm">
          <div className="form-group">
            <label htmlFor="animalName">Animal name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="animalName"
              value={this.state.animalName}
            />
          </div>
          <div className="form-group">
            <label htmlFor="species">Species</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="species"
              value={this.state.species}
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              value={this.state.notes}
            />
          </div>
          <div className="form-group">
            <label htmlFor="image">Image TODO image upload?</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="image"
              value={this.state.image}
            />
          </div>
          <button
            type="submit"
            onClick={this.updateExistingAnimal}
            className="btn btn-primary"
          >
            Submit
          </button>
        </form>
      </React.Fragment>
    )
  }
}