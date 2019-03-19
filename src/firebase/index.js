import 'firebase/storage'
import * as firebase from 'firebase'

  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyDw_TN__piu66o_h-wbIT6Cm58b4JJYaZI",
    authDomain: "bridge-e730e.firebaseapp.com",
    databaseURL: "https://bridge-e730e.firebaseio.com",
    projectId: "bridge-e730e",
    storageBucket: "bridge-e730e.appspot.com",
    messagingSenderId: "336075121290"
  };
  firebase.initializeApp(config);

const storage = firebase.storage()

export {
    storage, firebase as default
}