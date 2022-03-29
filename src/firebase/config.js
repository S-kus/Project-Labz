import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyA3Gh71-AhUFuBGyFlr1giTBTmYFQBuvOs",
    authDomain: "project-tech-3cbb1.firebaseapp.com",
    projectId: "project-tech-3cbb1",
    storageBucket: "project-tech-3cbb1.appspot.com",
    messagingSenderId: "703216993750",
    appId: "1:703216993750:web:ae144bc7723a7d2113d077"
  };

// init firebase
firebase.initializeApp(firebaseConfig)

// init services
const projectFirestore = firebase.firestore()
const projectAuth = firebase.auth()
const projectStorage = firebase.storage()

// timestamp
const timestamp = firebase.firestore.FieldValue.serverTimestamp

export { projectFirestore, projectAuth, timestamp, projectStorage }