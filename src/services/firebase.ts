import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/database'

export function loadFirebase(){
  const firebaseConfig = {
    apiKey: "AIzaSyBpLTfTInRYQZexVenp2DvM2aQoC8iZ_FY",
    authDomain: "letmeask-ee7df.firebaseapp.com",
    databaseURL: "https://letmeask-ee7df-default-rtdb.firebaseio.com",
    projectId: "letmeask-ee7df",
    storageBucket: "letmeask-ee7df.appspot.com",
    messagingSenderId: "251155417110",
    appId: "1:251155417110:web:d63735a7f0f734081d0d37"
  };
  // const firebaseConfig = {
  //   apiKey: process.env.REACT_APP_API_KEY,
  //   authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  //   databaseURL: process.env.REACT_APP_DATABASE_URL,
  //   projectId: process.env.REACT_APP_PROJECT_ID,
  //   storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  //   messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  //   appId: process.env.REACT_APP_APP_ID
  // }
  
  if(!firebase.apps.length){
    firebase.initializeApp(firebaseConfig)
  }
  const auth = firebase.auth()
  const database = firebase.database()

  return {
    firebase, auth, database
  }
}

// export { firebase, auth, database }

