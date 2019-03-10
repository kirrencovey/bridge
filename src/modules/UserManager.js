import Settings from "./Settings"

export default {
  get(id) {
    return fetch(`${Settings.remoteURL}/users/${id}`).then(e => e.json())
  },
  delete(id) {
    return fetch(`${Settings.remoteURL}/users/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll() {
    return fetch(`${Settings.remoteURL}/users`).then(e => e.json())
  },
  addUser(obj) {
    return fetch(`${Settings.remoteURL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
  },
  searchUP(email, password) {
    return fetch(
      `${Settings.remoteURL}/users?email=${email}&password=${password}`
    ).then(e => e.json())
  },
  searchEmail(email) {
    return fetch(`${Settings.remoteURL}/users?email=${email}`).then(e =>
      e.json()
    )
  }
}
