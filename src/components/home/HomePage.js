import React, { Component } from 'react'
import { Button } from 'reactstrap'



class HomePage extends Component {
    render() {
        return (
            <React.Fragment>
                    <h1 id="homeTitle">Welcome to Bridge!</h1>
                    <div id="homeText">Ready to train?</div>
                <Button color="info"
                    type="button"
                    className="addBtn mainBtn"
                    id="mainBtn"
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start A Session</Button>
                    <Button color="secondary"
                    className="addBtn mainBtn"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add New Animal</Button>
                    <Button color="secondary"
                    className="addBtn mainBtn"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add New Behavior</Button>
            </React.Fragment>
        )
    }
}

export default HomePage