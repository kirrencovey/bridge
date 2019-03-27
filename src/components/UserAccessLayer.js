import React, { Component } from "react"
import Navigation from "./nav/Nav"
import ApplicationViews from "./ApplicationViews"
import UserManager from "../modules/UserManager"

export default class UserAccessLayer extends Component {
  state = {
    activeUser: {}
  }

  //Uses active user ID to fetch active user object and sets state
  componentDidMount() {
    UserManager.getAll("user").then(activeUser =>
      this.setState({ activeUser: activeUser })
    )
  }

  //Gets active user ID from session storage
  activeUserId = () => sessionStorage.getItem("credentials")


  //Sets state for activeUser, passes to app views
  render() {
    return (
      <React.Fragment>
        <Navigation setAuth={this.props.setAuth} history={this.props.history} activeUser={this.state.activeUser} />
        <ApplicationViews
          activeUserId={this.activeUserId}
          activeUser={this.state.activeUser}
        />
      </React.Fragment>
    )
  }
}
