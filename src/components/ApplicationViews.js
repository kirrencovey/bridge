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
  activeUserId = this.props.activeUserId()

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

  // Function to add new animal to database. Invoked by submit button on AnimalForm
  addAnimal = animal =>
    AnimalManager.add(animal, "animals")
        .then(() => AnimalManager.getAll(`animals?userId=${this.activeUserId}`))
        .then(animals =>
        this.setState({
            animals: animals
        })
  )

  updateAnimal = editedAnimalObject =>
    AnimalManager.update(editedAnimalObject, "animals")
      .then(() => AnimalManager.getAll(`animals?userId=${this.activeUserId}`)
      .then(animals => {
          this.setState({ animals: animals })
        }))

  deleteAnimal = animalId => {
    AnimalManager.delete(animalId, "animals")
      .then(() => AnimalManager.getAll(`animals?userId=${this.activeUserId}`)
      .then(animals => this.setState({ animals: animals })))
  }

  // Function to add new behavior to database. Invoked by submit button on BehaviorForm
  addBehavior = behavior =>
    BehaviorManager.add(behavior, "behaviors")
      .then(() => BehaviorManager.getAll(`behaviors?userId=${this.activeUserId}`))
      .then(behaviors => this.setState({ behaviors: behaviors }))

  // Function to assign a new behavior to an animal. Invoked on AnimalDetail>BehaviorList
  addAssignedBehavior = assignedBehavior =>
      BehaviorManager.add(assignedBehavior, "assignedBehaviors")
      .then(() => BehaviorManager.getAll("assignedBehaviors?_expand=behavior"))
      .then(assignedBehaviors => this.setState({assignedBehaviors: assignedBehaviors}))

  // Function to delete assigned behavior from an animal. Invoked on AnimalDetail>BehaviorList
  deleteAssignedBehavior = assignedBehavior =>
    BehaviorManager.delete(assignedBehavior, "assignedBehaviors")
    .then(() => BehaviorManager.getAll("assignedBehaviors?_expand=behavior"))
    .then(assignedBehaviors => this.setState({assignedBehaviors: assignedBehaviors}))

  updateBehavior = editedBehaviorObject =>
    BehaviorManager.update(editedBehaviorObject, "behaviors")
      .then(() => BehaviorManager.getAll(`behaviors?userId=${this.activeUserId}`)
      .then(behaviors => {this.setState({ behaviors: behaviors })}))

  deleteBehavior = behaviorId => {
          BehaviorManager.delete(behaviorId, "behaviors")
            .then(() => BehaviorManager.getAll(`behaviors?userId=${this.activeUserId}`)
            .then(behaviors => {this.setState({ behaviors: behaviors })}))
  }

  // Function to add new session to database. Invoked by submit button on SessionForm
  addSession = session =>
    SessionManager.add(session, "sessions")

  deleteSession = sessionId => {
    SessionManager.delete(sessionId, "sessions")
      .then(() => SessionManager.getAll("sessions?_expand=animal")
      .then(sessions => this.setState({ sessions: sessions })))
  }

  // Function to add new session behavior to database. Invoked by add/finish buttons on SessionForm
  addSessionBehavior = sessionBehavior =>
  SessionManager.add(sessionBehavior, "sessionBehaviors")
    .then(() => SessionManager.getAll("sessionBehaviors?_expand=behavior&_expand=session"))
    .then(sessionBehaviors => this.setState({sessionBehaviors: sessionBehaviors}))
    .then(() => SessionManager.getAll("sessions?_expand=animal"))
    .then(sessions => this.setState({sessions: sessions}))


  componentDidMount() {
    const newState = {}

    AnimalManager.getAll(`animals?userId=${this.activeUserId}`)
    .then(animals => newState.animals = animals)
    .then(() => BehaviorManager.getAll(`behaviors?userId=${this.activeUserId}`))
    .then(behaviors => newState.behaviors = behaviors)
    .then(() => SessionManager.getAll(`sessions?_expand=animal&userId=${this.activeUserId}`))
    .then(sessions => newState.sessions = sessions)
    .then(() => BehaviorManager.getAll("assignedBehaviors?_expand=behavior"))
    .then(assignedBehaviors => newState.assignedBehaviors = assignedBehaviors)
    .then(() => SessionManager.getAll("sessionBehaviors?_expand=behavior&_expand=session"))
    .then(sessionBehaviors => newState.sessionBehaviors = sessionBehaviors)
    .then(() => newState.activeUser = this.props.activeUser)
    .then(() => this.setState(newState))
  }

  render() {

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
                      animals={this.state.animals}
                      deleteAnimal={this.deleteAnimal} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/animals/new" render={(props) => {
          return <AnimalForm {...props}
                      activeUser={this.state.activeUser}
                      addAnimal={this.addAnimal} />
        }} />
        <Route exact path="/animals/:animalId(\d+)" render={(props) => {
          return <AnimalDetail {...props}
                      animals={this.state.animals}
                      sessions={this.state.sessions}
                      behaviors={this.state.behaviors}
                      assignedBehaviors={this.state.assignedBehaviors}
                      sessionBehaviors={this.state.sessionBehaviors}
                      addAssignedBehavior={this.addAssignedBehavior}
                      deleteAssignedBehavior={this.deleteAssignedBehavior} />
        }} />
        <Route path="/animals/:animalId(\d+)/edit" render={props => {
            return <AnimalEdit {...props}
                        activeUser={this.state.activeUser}
                        updateAnimal={this.updateAnimal} />
        }} />

        {/* Behavior Routes */}
        <Route exact path="/behaviors" render={props => {
          if (this.isAuthenticated()) {
            return <BehaviorPage {...props}
                      behaviors={this.state.behaviors}
                      activeUser={this.state.activeUser}
                      deleteBehavior={this.deleteBehavior} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route path="/behaviors/new" render={(props) => {
          return <BehaviorForm {...props}
                      activeUser={this.state.activeUser}
                      addBehavior={this.addBehavior} />
        }} />
        <Route path="/behaviors/:behaviorId(\d+)/edit" render={props => {
            return <BehaviorEdit {...props}
                        activeUser={this.state.activeUser}
                        updateBehavior={this.updateBehavior} />
        }} />

        {/* Session Routes */}
        <Route exact path="/sessions" render={props => {
          if (this.isAuthenticated()) {
            return <SessionPage {...props}
                      sessions={this.state.sessions}
                      activeUser={this.state.activeUser}
                      sessionBehaviors={this.state.sessionBehaviors}
                      deleteSession={this.deleteSession} />
          } else {
            return <Redirect to="/login" />
          }
        }} />
        <Route exact path="/sessions/new" render={(props) => {
          return <SessionForm {...props}
                      addSession={this.addSession}
                      addSessionBehavior={this.addSessionBehavior}
                      assignedBehaviors={this.state.assignedBehaviors}
                      animals={this.state.animals}
                      activeUser={this.state.activeUser} />
        }} />
        <Route exact path="/sessions/:sessionId(\d+)" render={(props) => {
          return <SessionDetail {...props}
                      sessions={this.state.sessions}
                      sessionBehaviors={this.state.sessionBehaviors} />
        }} />
        <Route path="/sessions/:sessionId(\d+)/edit" render={props => {
            return <SessionEdit {...props}
                        updateSession={this.updateSession} />
        }} />

    </React.Fragment>
  }
}

export default ApplicationViews
