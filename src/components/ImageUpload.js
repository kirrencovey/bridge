import React, { Component } from "react"
import { Button } from 'reactstrap'
import { storage } from '../firebase'


class ImageUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            image: null,
            url: ""
            // progress: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)
    }

    handleChange = evt => {
        if(evt.target.files[0]) {
            const image = evt.target.files[0]
            this.setState(() => ({image}))
        }
    }

    handleUpload = () => {
        const {image} = this.state
        const uploadTask = storage.ref(`images/${image.name}`).put(image)
        uploadTask.on("state_changed",
            (snapshot) => {
                // progress function
                // const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                // this.setState({progress})
            },
            (error) => {
                // error function
                console.log(error)
            },
            () => {
                // complete function
                storage.ref("images").child(image.name).getDownloadURL()
                    .then(url => {
                        this.setState({url})
                    })
                    .then(this.onImageUploaded())
            }
        )
    }

    onImageUploaded = () => {
        this.props.imageUploaded(this.state.url)
    }

    render() {
        return (
            <React.Fragment>
                {/* <progress value={this.state.progress} max="100" /><br /> */}
                <label htmlFor="image">Add a Photo</label>
                <div id="imageUpload" className="behaviorListItem">
                    <input
                        className="form-control"
                        type="file"
                        onChange={this.handleChange}
                    />
                    <Button
                        color="secondary"
                        onClick={this.handleUpload}
                    >Choose</Button>
                    <Button
                        color="info"
                        onClick={this.onImageUploaded.bind(this)}
                    >Upload</Button>
                </div>
            </React.Fragment>
        )
    }
}

export default ImageUpload