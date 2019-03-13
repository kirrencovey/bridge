import React, { Component } from 'react'


class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                <section className="homepage">
                    <h1>Welcome to Bridge!</h1>
                    Ready to train?
                </section>
                <button type="button"
                    className="btn btn-success"
                    id="sessionButton"
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start A Session</button>
                    <br/>
                    <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</button>
                    <br/>
                    <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add New Behavior</button>
            </React.Fragment>
        )
    }
}

export default HomePage