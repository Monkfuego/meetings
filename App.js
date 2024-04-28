// src/App.js
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import Login from './components/Login';
import Register from './components/Register';

firebase.initializeApp({
  apiKey: "",
  authDomain: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
  appId: ""
});

const App = () => {
  const user = firebase.auth().currentUser;

  return (
    <div>
      <h1>Google Meet App</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
        </div>
      ) : (
        <div>
          <Login />
          <Register />
        </div>
      )}
    </div>
  );
};

export default App;
