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


    handleChange = evt => {
        if(evt.target.files[0]) {
            const image = evt.target.files[0]
            this.setState(() => ({image}))
        }
    }

    handleUpload = (imageBlob) => {
        document.querySelector("#cropper-container").innerHTML=`<img class="spinner" src="/images/spinner.gif" />`
        const dateTime = Date.parse(new Date())
        const imagePath = `${dateTime}-${imageBlob.name}`
        const uploadTask = storage.ref(`images/${imagePath}`).put(imageBlob)
        uploadTask.on("state_changed",
            (snapshot) => {
                // progress function
                const progress = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
                this.setState({progress})
            },
            (error) => {
                // error function
            },
            () => {
                // complete function
                storage.ref("images").child(imagePath).getDownloadURL()
                    .then(url => {
                        this.setState({url})
                    })
                    .then(() => this.onImageUploaded())
                    .then(() => {
                        document.querySelector("#cropper-container").innerHTML=`<img src="${this.state.url}" />`
                    })
            }
        )
    }

    onImageUploaded = () => {
        this.props.imageUploaded(this.state.url)
    }

    errorHandler = (type) => {
        console.error(type);
        window.alert("Something went wrong. Try another image.")
    }

    render() {
        const maxsize = 1024 * 1024 * 6
        return (
            <React.Fragment>

                <div id="cropper-container">
                    <AvatarImageCropper
                        errorHandler={this.errorHandler}
                        apply={this.handleUpload}
                        maxsize={maxsize}
                        />
                </div>

            </React.Fragment>
        )
    }
}

export default ImageUpload
