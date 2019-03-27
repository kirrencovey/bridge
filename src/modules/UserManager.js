import Settings from "./Settings"
import APIManager from "./APIManager"

export default Object.create(APIManager, {
  searchEP: {
    value: function (email, password) {

    return fetch(
      `${Settings.remoteURL}/token`,
        {
          method: 'POST',
          body: JSON.stringify({email, password}),
          headers: {
            'Content-Type': 'application/json'
          }
        }
    ).then(e => {
      return e.json();
    })
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
