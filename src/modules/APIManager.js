import Settings from "./Settings"

export default {
  get(id, category) {
    return fetch(`${Settings.remoteURL}/${category}/${id}`).then(e => e.json())
  },
  delete(id, category) {
    return fetch(`${Settings.remoteURL}/${category}/${id}`, {
      method: "DELETE"
    }).then(e => e.json())
  },
  getAll(category) {
    return fetch(`${Settings.remoteURL}/${category}`).then(e => e.json())
  },
  add(obj, category) {
    return fetch(`${Settings.remoteURL}/${category}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(obj)
    }).then(data => data.json())
    .then((res) => {return res})
  }
}
