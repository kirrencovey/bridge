import Settings from "./Settings"
import APIManager from "./APIManager"

export default Object.create(APIManager, {
    getUsersAnimals(activeUserId) {
        return fetch(`${Settings.remoteURL}/animals?userId=${activeUserId}`).then(e => e.json())
      }
})