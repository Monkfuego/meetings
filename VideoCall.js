import React, { useEffect, useRef } from 'react';
import SimplePeer from 'simple-peer';

const VideoCall = () => {
  const videoRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true })
      .then(stream => {
        videoRef.current.srcObject = stream;

        const peer = new SimplePeer({ initiator: true, stream });

        peer.on('signal', data => {
        });

        peer.on('stream', stream => {
        });
      })
      .catch(error => {
        console.error('Error accessing media devices:', error);
      });
  }, []);

  return <video ref={videoRef} autoPlay />;
};

export default VideoCall;

