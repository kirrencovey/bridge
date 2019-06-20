import React, { Component } from 'react'
import { Button } from 'reactstrap'



class Contact extends Component {
    render() {
        return (
            <section className="pageContents">
                    <div className="homeCard">
                        <h1 className="homeTitle">bridge!</h1>
                        <br /><br />
                        Your feedback is appreciated!
                        <br /><br />
                        Please report any bugs to Kirren at:<br />
                        <a className="emphasize" href="mailto:trainingbridge.app@gmail.com">trainingbridge.app@gmail.com</a>
                        <br /><br /><br />
                        {/* <div className="deemphasize">If you would like to support the development of this app, donations of any size are greatly appreciated! </div>
                        <div>venmo: @kirrencovey</div> */}
                        <br /><br />
                        <div className="emphasize">Thank you for using bridge!</div>
                    </div>
            </section>
        )
    }
}

export default Contact