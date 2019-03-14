import React, { Component } from "react"
import Login from "./Login"
import UserAccessLayer from "../UserAccessLayer"
import Register from "./RegisterForm"
import { withRouter } from 'react-router'


//Checks if a user is logged in. If so, directs to user access layer, otherwise directs to login page
class IsAuth extends Component {
  render() {
    return (
      <React.Fragment>
        {
          // Check if user is authenticated
          this.props.isAuthenticated()
          // If yes, show user access layer
          ? (<UserAccessLayer {...this.props} />)
          // If not, check path to determine if register or login page should be shown
          : ( this.props.location.pathname === "/register"
          ?
          <Register {...this.props} />
          :
          <Login {...this.props} />
          )
        }
      </React.Fragment>
    )
  }
}

export default withRouter(IsAuth)
