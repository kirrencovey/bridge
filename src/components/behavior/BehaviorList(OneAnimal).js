import React, { Component } from "react"

export default class BehaviorList extends Component {
    render() {

        let thisAnimalsBehaviors = this.props.assignedBehaviors.filter(behavior => behavior.animalId === this.props.animal.id)
        let behaviorNameArray = thisAnimalsBehaviors.map(behavior => behavior.behavior.name)
        console.log(behaviorNameArray)

        return (
            <React.Fragment>
                {/* Filter out current animal's behaviors, make list item for each */}
                {
                    thisAnimalsBehaviors
                        .map(behavior => <li key={behavior.id}>{behavior.behavior.name}</li>)
                }

                {/* dropdown to add behaviors to animal */}
                <select
              defaultValue=""
              name="behavior"
              id="behaviorId"
            //   onChange={this.handleFieldChange}
            >
              <option value="">Add A Behavior</option>
              {
                  this.props.behaviors.map(b => {
                    if (behaviorNameArray.includes(b.name) === false) {
                    return <option key={b.id} id={b.id} value={b.id}>{b.name}</option>
                    }})
              }
            </select>
                <button type="button"
                    className="btn btn-success"
                    onClick={() => {
                        /* do something */
                    }}>Add</button>
            </React.Fragment>
        )
    }
}