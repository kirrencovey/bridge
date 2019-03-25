import React, { Component } from 'react'
import { Button } from 'reactstrap'



class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                    <div className="homeCard">
                        <h1 className="homeTitle">bridge!</h1>
                        <br /><br />
                        We're in beta testing. Your feedback is essential!
                        <br /><br />
                        Please report any bugs to:
                        <div className="emphasize">trainingbridge.app@gmail.com</div>
                        <br /><br /><br /><br /><br />
                        If you find this app valuable, and would like to contribute financially to support development during the beta period, my venmo handle is @kirrencovey
                        <div className="deemphasize">No amount is too small, and any help is immensely appreciated!</div>
                        <br />
                        <div className="emphasize">Thank you for using bridge!</div>
                    </div>
            </React.Fragment>
        )
    }
}

export default Contact