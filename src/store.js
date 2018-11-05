import { createStore, combineReducers, compose } from "redux";
import firebase from "firebase";
import "firebase/firestore"; // <- needed if using firestore
import { reactReduxFirebase, firebaseReducer } from "react-redux-firebase";
import { reduxFirestore, firestoreReducer } from "redux-firestore";

// Reducers - Todo

const firebaseConfig = {
  apiKey: "AIzaSyBlHTTEfW3ETQnCG6rZbbIdYw0-eifbFPs",
  authDomain: "reactclientpanel-7ffa0.firebaseapp.com",
  databaseURL: "https://reactclientpanel-7ffa0.firebaseio.com",
  projectId: "reactclientpanel-7ffa0",
  storageBucket: "reactclientpanel-7ffa0.appspot.com",
  messagingSenderId: "323658285383"
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: "users",
  useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// Initialize firebase instance
firebase.initializeApp(firebaseConfig);
// Init firestore
// const firestore = firebase.firestore();

// Add reactReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
  reduxFirestore(firebase) // <- needed if using firestore
)(createStore);

// Add firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  firestore: firestoreReducer // <- needed if using firestore
});

// Create initial state
const initialState = {};

// Create Store
const store = createStoreWithFirebase(
  rootReducer,
  initialState,
  compose(
    reactReduxFirebase(firebase),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
