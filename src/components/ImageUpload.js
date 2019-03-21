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
                window.alert("Something went wrong. Try another image.")
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
                    {/* <input
                        className="form-control"
                        type="file"
                        onChange={this.handleChange}
                    /> */}
                    {/* <Button
                        color="secondary"
                        onClick={this.handleUpload}
                    >Upload</Button> */}
                </div>

                    <div id="cropper-container">
                        <AvatarImageCropper
                            errorHandler={this.errorHandler}
                            // actions={this.actions}
                            apply={this.handleUpload} 
                            />

                    </div>

            </React.Fragment>
        )
    }
}

export default ImageUpload