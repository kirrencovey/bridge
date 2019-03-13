import React, { Component } from 'react'
import { Button } from 'reactstrap'



class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="homepage">
                    <h1>Welcome to Bridge!</h1>
                    Ready to train?
                </section>
                <Button color="info"
                    type="button"
                    id="sessionButton"
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start A Session</Button>
                    <br/>
                    <Button color="secondary"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</Button>
                    <br/>
                    <Button color="secondary"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add New Behavior</Button>
            </React.Fragment>
        )
    }
}

export default HomePage