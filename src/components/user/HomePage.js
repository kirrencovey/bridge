import React, { Component } from 'react'
import { Button } from 'reactstrap'



class HomePage extends Component {

    componentDidMount() {
        window.scrollTo(0, 0)
      }

    render() {
        return (
            <section className="pageContents">
                    <div className="homeCard">
                        <h1 className="homeTitle">bridge!</h1>
                        <div className="homeText">ready to train?</div>
                    </div>
                <Button color="info"
                    type="button"
                    className="addBtn mainBtn"
                    id="mainBtn"
                    onClick={() => {
                        this.props.history.push("/sessions/new")}
                    }>Start Training!</Button>
                    <Button color="secondary"
                    className="addBtn mainBtn"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/animals/new")}
                    }>Add Animal</Button>
                    <Button color="secondary"
                    className="addBtn mainBtn"
                    type="button"
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add Behavior</Button>
            </section>
        )
    }
}

export default HomePage