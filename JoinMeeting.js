import React, { useEffect, useRef, useState } from 'react';
import SimplePeer from 'simple-peer';

const MultiPartyVideoCall = ({ meetingCode }) => {
  const [peers, setPeers] = useState([]);
  const localVideoRef = useRef();
  const remoteVideoRefs = useRef([]);

  useEffect(() => {
    const peerConfig = { initiator: false, trickle: false };

    // Initialize local video stream
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(localStream => {
        localVideoRef.current.srcObject = localStream;

        // Initialize peer connections for all participants
        const newPeers = [];
        const remoteStreams = [];
        // Connect to each peer in the meeting
        for (let i = 0; i < meetingCode.length; i++) {
          const peer = new SimplePeer({ ...peerConfig, stream: localStream });
          remoteVideoRefs.current[i] = React.createRef();
          peer.on('signal', signal => {
            // Send signaling data to the signaling server or other participants
          });
          peer.on('stream', remoteStream => {
            remoteStreams[i] = remoteStream;
            setPeers([...newPeers, peer]);
          });
          newPeers.push(peer);
        }

        // Display remote streams
        remoteStreams.forEach((stream, index) => {
          remoteVideoRefs.current[index].current.srcObject = stream;
        });
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });

    return () => {
      peers.forEach(peer => peer.destroy());
    };
  }, [meetingCode]);

  return (
    <div>
      <h2>Multi-Party Video Call</h2>
      <video ref={localVideoRef} autoPlay muted />
      {remoteVideoRefs.current.map((ref, index) => (
        <video key={index} ref={ref} autoPlay />
      ))}
    </div>
  );
};

export default MultiPartyVideoCall;
