import React, { Component } from "react"

export default class BehaviorList extends Component {
    render() {
        return (
            <React.Fragment>
                {/* Filter out current animal's behaviors, make list item for each */}
                {
                    this.props.assignedBehaviors.filter(behavior => behavior.animalId === this.props.animal.id)
                        .map(behavior => <li key={behavior.id}>{behavior.behavior.name}</li>)
                }
                TODO dropdown menu w/available behaviors<button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        /* do something */
                    }}>Add</button>
            </React.Fragment>
        )
    }
}