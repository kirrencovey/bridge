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
                    this.props.behaviors.filter(behavior => behavior.userId === this.props.activeUser.id)
                        .map(behavior =>
                            <div key={behavior.id}>
                                <BehaviorCard behavior={behavior}
                                    history={this.props.history} />
                            </div>)
                }
            </React.Fragment>
        )
    }
}