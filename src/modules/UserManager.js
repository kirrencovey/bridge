import Settings from "./Settings"
import APIManager from "./APIManager"

export default Object.create(APIManager, {
  searchEP: {
    value: function (email, password) {
    return fetch(
      `${Settings.remoteURL}/users?email=${email}&password=${password}`
    ).then(e => e.json())
  }
},
  searchEmail: {
    value: function (email) {
    return fetch(`${Settings.remoteURL}/users?email=${email}`).then(e =>
      e.json()
    )
  }
}
})