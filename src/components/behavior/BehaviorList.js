import React, { Component } from "react"
import BehaviorCard from "./BehaviorCard"

export default class BehaviorList extends Component {
    render() {
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success" //TODO Edit classes
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add New Behavior</button>
                List of user's behaviors<br/>
                <BehaviorCard />
            </React.Fragment>
        )
    }
}