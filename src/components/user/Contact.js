import React, { Component } from 'react'
import { Button } from 'reactstrap'



class Contact extends Component {
    render() {
        return (
            <section className="pageContents">
                    <div className="homeCard">
                        <h1 className="homeTitle">bridge!</h1>
                        <br /><br />
                        During beta testing your feedback is essential!
                        <br /><br />
                        Please report any bugs to Kirren at:
                        <div className="emphasize">trainingbridge.app@gmail.com</div>
                        <br /><br /><br /><br /><br />
                        <div className="deemphasize">If you would like to support the development of this app, donations through venmo are greatly appreciated <br /> @kirrencovey</div>
                        <br /><br />
                        <div className="emphasize">Thank you for using bridge!</div>
                    </div>
            </section>
        )
    }
}

export default Contact