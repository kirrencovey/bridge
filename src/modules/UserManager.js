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
        .catch(response => {
            return {error: 'An error occurred.'}
        })
    }
  },

    updatePassword: {
      value: function (payload) {
        return fetch(
            `${Settings.remoteURL}/user/${payload.id}/password/update`,
            {
                method: "PUT",
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${sessionStorage.getItem('credentials')}`
                }
            }
        ).then(response => response.json()
        ).then(response => {
            if (typeof response.error !== 'undefined') {
                return Promise.reject(response.error);
            }

            return response;
        })
    }},

  searchEmail: {
    value: function (email) {
    return fetch(`${Settings.remoteURL}/users?email=${email}`).then(e =>
      e.json()
    )
  }
}
})
