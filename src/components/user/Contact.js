import React, { Component } from 'react'
import { Button } from 'reactstrap'



class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                    <div className="homeCard">
                        <h1 className="homeTitle">bridge!</h1>
                        <br /><br />
                        During beta testing your feedback is essential!
                        <br /><br />
                        Please report any bugs to Kirren at:
                        <div className="emphasize">trainingbridge.app@gmail.com</div>
                        <br /><br /><br /><br /><br />
                        <div className="deemphasize">If you would like to support development of this app, donations through venmo are greatly appreciated @kirrencovey</div>
                        <br /><br />
                        <div className="emphasize">Thank you for using bridge!</div>
                    </div>
            </React.Fragment>
        )
    }
}

export default Contact