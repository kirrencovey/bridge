import React, { Component } from 'react'
import { Button } from 'reactstrap'



class Contact extends Component {
    render() {
        return (
            <React.Fragment>
                    <div className="homeCard">
                        <h1 className="homeTitle">bridge!</h1>
                        <br /><br />
                        <div className="homeText">
                            We're in beta testing. Your feedback is essential!
                            <br /><br />
                            Please report any bugs to:
                        </div>
                        <div id="contactEmail">trainingbridge.app@gmail.com</div>

                    </div>
            </React.Fragment>
        )
    }
}

export default Contact