import React, { Component } from "react"
import { Button } from 'reactstrap'
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';
import ImageUpload from "../ImageUpload";



export default class AnimalForm extends Component {
  // Set initial state
  state = {
    userId: "",
    animalName: "",
    species: "",
    notes: "",
    image: ""
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
  constructNewAnimal = evt => {
    evt.preventDefault()
    // Ensure name & species are filled in. Notes and image are optional.
    if (this.state.animalName === "" || this.state.species === "") {
      window.alert("Please enter the animal's name and species")
    }else {
      const animal = {
        userId: this.props.activeUser.id,
        name: this.state.animalName,
        species: this.state.species,
        notes: this.state.notes,
        image: this.state.image
      };

      // Create the animal and redirect user to animal list
      this.props
        .addAnimal(animal)
        .then(() => this.props.history.push("/animals"))
    }
  }

  imageUploaded = (url) => {
    this.setState({image: url})
  }

  render() {
    return (
        <form className="animalForm formContainer">
          <h2 className="formTitle">New Animal</h2>
          <div className="form-group">
            <label htmlFor="animalName">Name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="animalName"
              placeholder="Name"
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
              placeholder="Species"
            />
          </div>
          <div className="form-group">
            <label htmlFor="notes">Notes</label>
            <textarea
              className="form-control"
              onChange={this.handleFieldChange}
              id="notes"
              placeholder="Any notes relevant to training?"
            />
          </div>

          <label htmlFor="image">Add a Photo?</label>
          <ImageUpload imageUploaded={this.imageUploaded.bind(this)}/>

          <Button color="info"
            type="submit"
            onClick={this.constructNewAnimal}
            className="btn btn-primary"
          >
            Submit
          </Button>
        </form>
    )
  }
}