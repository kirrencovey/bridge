import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import AnimalList from "./animal/AnimalList"
import BehaviorList from "./behavior/BehaviorList"
import SessionList from "./sessions/SessionList"
import AnimalForm from "./animal/AnimalForm"
import BehaviorForm from "./behavior/BehaviorForm"
import SessionForm from "./sessions/SessionForm"
import AnimalDetail from "./animal/AnimalDetail"
import SessionDetail from "./sessions/SessionDetail"
import AnimalEdit from "./animal/AnimalEdit"
import BehaviorEdit from "./behavior/BehaviorEdit"
import SessionEdit from "./sessions/SessionEdit"

class ApplicationViews extends Component {
  state = {
    users: [],
    animals: [],
    behaviors: [],
    sessions: []
  }
  
  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  componentDidMount() {
    const newState = {
      users: [],
      animals: [],
      behaviors: [],
      sessions: []
    }

    let currentUserId = sessionStorage.getItem("credentials")


    /*...........*/
    // .then(() => this.setState(newState))
  }

  render() {
    console.log(this.props.activeUser)

    return <React.Fragment>

        <Route path="/login" component={Login} />

        <Route exact path="/" render={props => {
          if (this.isAuthenticated()) {
            return <HomePage {...props}/>
          } else {
            return <Redirect to="/login" />
          }
        }} />

        <Route exact path="/animals" render={props => {
          if (this.isAuthenticated()) {
            return <AnimalList {...props}
                      animals={this.state.animals} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props}
                      addAnimal={this.addAnimal} />
        }} />
        <Route exact path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props} />
        }} />
        <Route path="/animals/:animalId(\d+)/edit" render={props => {
            return <AnimalEdit {...props}
                        updateAnimal={this.updateAnimal} />
        }} />

        <Route exact path="/behaviors" render={props => {
          if (this.isAuthenticated()) {
            return <BehaviorList {...props}
                      behaviors={this.props.behaviors} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/behaviors/new" render={(props) => {
          return <BehaviorForm {...props}
                      addBehavior={this.addBehavior} />
        }} />
        <Route path="/behaviors/:behaviorId(\d+)/edit" render={props => {
            return <BehaviorEdit {...props}
                        updateBehavior={this.updateBehavior} />
        }} />

        <Route exact path="/sessions" render={props => {
          if (this.isAuthenticated()) {
            return <SessionList {...props}
                      sessions={this.state.sessions} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/sessions/new" render={(props) => {
          return <SessionForm {...props}
                      addSession={this.addSession} />
        }} />
        <Route exact path="/sessions/:sessionId(\d+)" render={(props) => {
          return <SessionDetail {...props} />
        }} />
        <Route path="/sessions/:sessionId(\d+)/edit" render={props => {
            return <SessionEdit {...props}
                        updateSession={this.updateSession} />
        }} />

    </React.Fragment>
  }
}

export default ApplicationViews
