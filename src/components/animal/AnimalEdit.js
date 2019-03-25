import React, { Component } from "react"
import AnimalManager from "../../modules/AnimalManager"
import { Button } from 'reactstrap'
import ImageUpload from "../ImageUpload";


export default class AnimalEdit extends Component {
    // Set initial state
  state = {
    userId: "",
    animalName: "",
    species: "",
    notes: "",
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
        .then(() => this.props.history.push(`/animals/${this.state.id}`))
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

    imageUploaded = (url) => {
      this.setState({image: url})
    }

  render() {
    return (
      <React.Fragment>
        <div className="animalEditForm formContainer">
          <h2 className="formTitle">Edit Animal</h2>
          <div className="form-group">
            <label htmlFor="animalName">Name</label>
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
            <label htmlFor="image">Choose a New Photo?</label>
            <div className="smallFont">(Skipping this step will not remove an existing photo)</div>
            <ImageUpload imageUploaded={this.imageUploaded.bind(this)}/>
          </div>
          <Button color="info"
            type="submit"
            onClick={this.updateExistingAnimal}
            className="btn btn-primary"
          >
            Submit
          </Button>
        </div>
      </React.Fragment>
    )
  }
}