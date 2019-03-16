import React, { Component } from "react"
import { Button } from 'reactstrap'
import { CustomInput, Form, FormGroup, Label } from 'reactstrap';



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

  render() {
    return (
      <div>
        <form className="animalForm">
          <div className="form-group">
            <label htmlFor="animalName">Animal name</label>
            <input
              type="text"
              required
              className="form-control"
              onChange={this.handleFieldChange}
              id="animalName"
              placeholder="Animal name"
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
          {/* REACTSTRAP file upload vs another type?? */}
          <FormGroup>
          <Label for="image">Add a Photo</Label>
          <CustomInput type="file" id="image" name="image" label="Choose a photo" />
          </FormGroup>
          {/* <div className="form-group">
            <label htmlFor="image">Image TODO image upload?</label>
            <input
              type="text"
              className="form-control"
              onChange={this.handleFieldChange}
              id="image"
              placeholder="TODO how to upload image??"
            />
          </div> */}
          {/* ***************************************** */}
          <Button color="info"
            type="submit"
            onClick={this.constructNewAnimal}
            className="btn btn-primary"
          >
            Submit
          </Button>
        </form>
      </div>
    )
  }
}