import React, { Component } from "react"
import { Route, Redirect } from "react-router-dom"
import Login from "./auth/Login"
import HomePage from "./home/HomePage"
import AnimalPage from "./animal/AnimalPage"
import BehaviorPage from "./behavior/BehaviorPage"
import SessionPage from "./sessions/SessionPage"
import AnimalForm from "./animal/AnimalForm"
import BehaviorForm from "./behavior/BehaviorForm"
import SessionForm from "./sessions/SessionForm"
import AnimalDetail from "./animal/AnimalDetail"
import SessionDetail from "./sessions/SessionDetail"
import AnimalEdit from "./animal/AnimalEdit"
import BehaviorEdit from "./behavior/BehaviorEdit"
import SessionEdit from "./sessions/SessionEdit"
import AnimalManager from "../modules/AnimalManager"
import BehaviorManager from "../modules/BehaviorManager"
import SessionManager from "../modules/SessionManager"

class ApplicationViews extends Component {
  state = {
    // users: [],  TODO is this needed anywhere?
    animals: [],
    behaviors: [],
    sessions: [],
    assignedBehaviors: [],
    sessionBehaviors: [],
    activeUser: {}
  }

  isAuthenticated = () => sessionStorage.getItem("credentials") !== null

  componentDidMount() {
    const newState = {}

    AnimalManager.getAll("animals")
    .then(animals => newState.animals = animals)
    .then(() => BehaviorManager.getAll("behaviors"))
    .then(behaviors => newState.behaviors = behaviors)
    .then(() => SessionManager.getAll("sessions"))
    .then(sessions => newState.sessions = sessions)
    .then(() => BehaviorManager.getAll("assignedBehaviors?_expand=behavior"))  //Expand behavior --do elsewhere??
    .then(assignedBehaviors => newState.assignedBehaviors = assignedBehaviors)
    .then(() => SessionManager.getAll("sessionBehaviors?_expand=behavior&_expand=session"))  //Expand session & behavior --needed??
    .then(sessionBehaviors => newState.sessionBehaviors = sessionBehaviors)
    .then(() => newState.activeUser = this.props.activeUser)
    .then(() => this.setState(newState))
  }

  render() {
    console.log(this.state)

    return <React.Fragment>

        <Route path="/login" component={Login} />

        <Route exact path="/" render={props => {
          if (this.isAuthenticated()) {
            return <HomePage {...props}/>
          } else {
            return <Redirect to="/login" />
          }
        }} />

         {/* Animal Routes */}
        <Route exact path="/animals" render={props => {
          if (this.isAuthenticated()) {
            return <AnimalPage {...props}
                      activeUser={this.state.activeUser}
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
          return <AnimalDetail {...props}
                      animals={this.state.animals}
                      assignedBehaviors={this.state.assignedBehaviors}
                      sessionBehaviors={this.state.sessionBehaviors} />
        }} />
        <Route path="/animals/:animalId(\d+)/edit" render={props => {
            return <AnimalEdit {...props}
                        updateAnimal={this.updateAnimal} />
        }} />

        {/* Behavior Routes */}
        <Route exact path="/behaviors" render={props => {
          if (this.isAuthenticated()) {
            return <BehaviorPage {...props}
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

        {/* Session Routes */}
        <Route exact path="/sessions" render={props => {
          if (this.isAuthenticated()) {
            return <SessionPage {...props}
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
