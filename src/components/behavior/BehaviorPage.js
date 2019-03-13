import React, { Component } from "react"
import BehaviorCard from "./BehaviorCard"

export default class BehaviorPage extends Component {
    render() {
        return (
            <React.Fragment>
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        this.props.history.push("/behaviors/new")}
                    }>Add New Behavior</button><br/>
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
                            <div key={behavior.id}>
                                <BehaviorCard behavior={behavior}
                                    history={this.props.history}
                                    deleteBehavior={this.props.deleteBehavior} />
                            </div>)
                }
            </React.Fragment>
        )
    }
}