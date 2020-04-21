import * as firebase from 'firebase'
const firebaseConfig = require('./firebaseConfig.json')

firebase.initializeApp(firebaseConfig)
export const database = firebase.database()
export const rootRef = firebase.database().ref('presidente')
export const functions = firebase.functions()
