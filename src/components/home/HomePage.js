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
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start A Session</button>
            </React.Fragment>
        )
    }
}

export default HomePage