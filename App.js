
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/auth';
import ScheduleMeeting from './ScheduleMeeting';
import Login from './Login';
import Register from './Register';
import JoinMeeting from './JoinMeeting'; 
import VideoCall from './VideoCall';

// Firebase 
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
