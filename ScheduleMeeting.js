// src/components/ScheduleMeeting.js
import React, { useState } from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';

const ScheduleMeeting = () => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const handleSchedule = async (e) => {
    e.preventDefault();
    try {
      const currentUser = firebase.auth().currentUser;
      const userId = currentUser.uid;

      await firebase.firestore().collection('meetings').add({
        title,
        startTime,
        endTime,
        userId,
      });

      setTitle('');
      setStartTime('');
      setEndTime('');

      alert('Meeting scheduled successfully!');
    } catch (error) {
      console.error(error.message);
    }
  };

  return (
     <div>
      <h2>Schedule Meeting</h2>
      <button onClick={handleScheduleMeeting}>Schedule Meeting</button>
      {meetingCode && (
        <div>
          <p>Meeting Code: {meetingCode}</p>
          <p>Share this code with others to join the meeting</p>
        </div>
      )}
    </div>
  );
};

export default ScheduleMeeting;

