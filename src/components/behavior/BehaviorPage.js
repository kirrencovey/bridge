import React, { Component } from "react"
import BehaviorCard from "./BehaviorCard"
import { Button } from 'reactstrap'


export default class BehaviorPage extends Component {
    render() {
        return (
            <React.Fragment>
                <Button color="info"
                    type="button"
                    className="btn btn-success addBtn"
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add New Behavior</Button>
                {
                    this.props.behaviors
                        // Sort behaviors alphabetically by name
                        .sort((a, b) => {
                            var nameA = a.name.toUpperCase() // ignore upper and lowercase
                            var nameB = b.name.toUpperCase() // ignore upper and lowercase
                            if (nameA < nameB) {
                                return -1;
                            }
                            if (nameA > nameB) {
                                return 1;
                            }})
                        .map(behavior =>
                            <div key={behavior.id} className="card">
                                <BehaviorCard behavior={behavior}
                                    history={this.props.history}
                                    deleteBehavior={this.props.deleteBehavior} />
                            </div>)
                }
            </React.Fragment>
        )
    }
}