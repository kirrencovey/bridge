import Settings from "./Settings"

export default {
  get(id, category) {
    return fetch(`${Settings.remoteURL}/${category}/${id}`, {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('credentials')}`
      }
    }).then(e => {
        this.verifyAuthed(e);
        return e.json()
    })
  },
  delete(id, category) {
    return fetch(`${Settings.remoteURL}/${category}/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('credentials')}`
      }
    }).then(e => {
      this.verifyAuthed(e);
        return e.json()
    })
  },
  getAll(category) {
    return fetch(
        `${Settings.remoteURL}/${category}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem('credentials')}`
        }
    })
    .then(e => {
        this.verifyAuthed(e);
        return e.json()
    })
  },
  add(obj, category) {
    return fetch(`${Settings.remoteURL}/${category}`, {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem('credentials')}`
      }
    }).then(data => {
      this.verifyAuthed(data);
      return data.json()
    })
    .then((res) => res)
  },
  update (editedObject, category) {
    return fetch(`${Settings.remoteURL}/${category}/${editedObject.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem('credentials')}`
      },
      body: JSON.stringify(editedObject)
    })
    .then(data => {
      this.verifyAuthed(data);
      return data.json()
    })
  },
  register(user) {
    return fetch(`${Settings.remoteURL}/register`, {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json"
      }
    }).then(data => data.json())
    .then((res) => {return res})
  },
  verifyAuthed(response) {
    if (response.status === 403) {
      sessionStorage.removeItem('credentials');
      this.props.history.push('/login')
    }
  }
}
