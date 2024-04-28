// src/components/JoinMeeting.js
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const JoinMeeting = () => {
  const [meetingCode, setMeetingCode] = useState('');

  const handleJoin = async (e) => {
    e.preventDefault();
    try {
      const querySnapshot = await firebase.firestore().collection('meetings').where('code', '==', meetingCode).get();
      if (querySnapshot.empty) {
        alert('Meeting not found');
        return;
      }

      // Join the meeting
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
    <div>
      <h2>Join Meeting</h2>
      <form onSubmit={handleJoin}>
        <input type="text" placeholder="Meeting Code" value={meetingCode} onChange={(e) => setMeetingCode(e.target.value)} />
        <button type="submit">Join</button>
      </form>
    </div>
  );
};

export default JoinMeeting;

