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
      <form onSubmit={handleSchedule}>
        <input type="text" placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="datetime-local" placeholder="Start Time" value={startTime} onChange={(e) => setStartTime(e.target.value)} />
        <input type="datetime-local" placeholder="End Time" value={endTime} onChange={(e) => setEndTime(e.target.value)} />
        <button type="submit">Schedule</button>
      </form>
    </div>
  );
};

export default ScheduleMeeting;

