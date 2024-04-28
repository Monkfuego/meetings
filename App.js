
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import ScheduleMeeting from './ScheduleMeeting';
import Login from './Login';
import Register from './Register';
import JoinMeeting from './JoinMeeting'; 
import VideoCall from './VideoCall';

// Firebase - 
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.11.1/firebase-analytics.js";
const firebaseConfig = {
    apiKey: "AIzaSyA7xwKYfb4sIL8CdQu6RUZ4cIgx2BRgVvg",
    authDomain: "meetings-57c01.firebaseapp.com",
    projectId: "meetings-57c01",
    storageBucket: "meetings-57c01.appspot.com",
    messagingSenderId: "410327257218",
    appId: "1:410327257218:web:c898669b43e7d57e34e49b",
    measurementId: "G-6R2E3HGTB2"
  };

  // Initialize Firebase - 
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const App = () => {
const [isInMeeting, setIsInMeeting] = useState(false);
const [meetingCode, setMeetingCode] = useState('');

const handleJoinMeeting = (code) => {
    setMeetingCode(code);
    setIsInMeeting(true);
  };
const user = firebase.auth().currentUser;


return (
    <div>
      <h1>MEETING APPLICATION</h1>
      {user ? (
        <div>
          <h2>Welcome, {user.email}</h2>
          <button onClick={() => firebase.auth().signOut()}>Logout</button>
          {!isInMeeting ? (
            <div>
              <ScheduleMeeting />
              <JoinMeeting onJoin={handleJoinMeeting} />
            </div>
          ) : (
            <VideoCall meetingCode={meetingCode} />
          )}
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
