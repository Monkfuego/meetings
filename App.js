import React from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import ScheduleMeeting from './ScheduleMeeting';
import Login from './Login';
import Register from './Register';

//Firebase -
const App = () => {
  const user = firebase.auth().currentUser;

  return (
    <div>
      <h1>Google Meet App</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
          <ScheduleMeeting />
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

