import React, { Component } from "react"
import { Button } from 'reactstrap'
import { storage } from '../firebase'

import AvatarImageCropper from 'react-avatar-image-cropper'


class ImageUpload extends Component {
    constructor (props) {
        super(props)
        this.state = {
            image: null,
            url: "",
            progress: 0
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleUpload = this.handleUpload.bind(this)

    }

    actions = [
        <button key={0}>test_cancel</button>,
        <button key={1} onClick={this.handleUpload}>test_apply</button>,
    ]

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
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress})
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
                    .then(() => this.onImageUploaded())
                    .then(() => document.querySelector("#progress").classList.toggle("hidden"))
            }
        )
    }

    onImageUploaded = () => {
        this.props.imageUploaded(this.state.url)
    }


    apply = (file) => {
        // handle the blob file you want
        // such as get the image src
        var src = window.URL.createObjectURL(file);
    }

    errorHandler = (type) => {
        console.log(type);
    }



    render() {
        return (
            <React.Fragment>
                <div id="imageUpload" className="behaviorListItem">
                    <input
                        className="form-control"
                        type="file"
                        onChange={this.handleChange}
                    />
                    <Button
                        color="secondary"
                        onClick={this.handleUpload}
                    >Upload</Button>
                </div>
                    <div id="progress" className="hidden">Upload Complete!</div>


                    <div style={{ width: '200px', height: '200px', margin: 'auto', border: '1px solid black' }}>
                        <AvatarImageCropper apply={this.apply}
                            errorHandler={this.errorHandler}
                            actions={this.actions}
                            handleUpload={this.handleUpload} />

                    </div>

            </React.Fragment>
        )
    }
}

export default ImageUpload