import React, { Component } from "react"
import { Button } from 'reactstrap'


export default class BehaviorCard extends Component {
    render() {
        return (
            <React.Fragment>
                <div className="cardTitle">{this.props.behavior.name}</div>
                <div>{this.props.behavior.summary}</div>
                <div className="btnContainer">
                <Button color="info"
                    type="button"
                    className="btn-edit"
                    onClick={() => {
                        this.props.history.push(`/behaviors/${this.props.behavior.id}/edit`)
                    }}
                ><i className="fas fa-edit"></i></Button>
                <Button color="secondary"
                    type="button"
                    className=".btn-delete"
                    onClick={() => {
                        let confirm = window.confirm("Are you sure you want to delete this behavior? Doing so will delete all associated training records.")
                        if (confirm === true) {
                            this.props.deleteBehavior(this.props.behavior.id)
                        }
                    }}
                ><i className="fas fa-trash-alt"></i></Button>
                </div>
            </React.Fragment>
        )
    }
}