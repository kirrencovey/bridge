import React, { Component } from "react"
import Login from "./Login"
import UserAccessLayer from "../UserAccessLayer"

//Checks if a user is logged in. If so, directs to user access layer, otherwise directs to login page
class IsAuth extends Component {
  render() {
    return (
      <React.Fragment>
        {this.props.isAuthenticated() ? (
          <UserAccessLayer {...this.props} />
        ) : (
          <Login {...this.props} />
        )}
      </React.Fragment>
    )
  }
}

export default IsAuth
