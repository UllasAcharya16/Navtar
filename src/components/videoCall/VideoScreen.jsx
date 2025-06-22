import { useState, useEffect } from 'react';
import AgoraRTC from 'agora-rtc-sdk-ng';
import './VideoScreen.css';

function VideoScreen() {
  const [client] = useState(() => AgoraRTC.createClient({ mode: 'rtc', codec: 'vp8' }));
  const [localVideoTrack, setLocalVideoTrack] = useState(null);
  const [localAudioTrack, setLocalAudioTrack] = useState(null);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState('connecting');

  const APP_ID = 'a7aeacef31f4472ab9e1545f3622309a';
  const TOKEN = '007eJxTYJCJKOg+sFvfguNUywlDjWBJY/7TXfe3vdmpdqpRTOTr1noFhkTzxNTE5NQ0Y8M0ExNzo8Qky1RDUxPTNGMzIyNjA8tEjWnhGQ2BjAyTLKazMDJAIIgvyFCWmZKa75yfV1yaU5JYkpmfx8AAALHyI6c=';
  const CHANNEL = 'videoConsultation';

  useEffect(() => {
    const initAgora = async () => {
      try {
        await client.join(APP_ID, CHANNEL, TOKEN, null);

        const audioTrack = await AgoraRTC.createMicrophoneAudioTrack();
        const videoTrack = await AgoraRTC.createCameraVideoTrack();

        setLocalAudioTrack(audioTrack);
        setLocalVideoTrack(videoTrack);

        await client.publish([audioTrack, videoTrack]);

        videoTrack.play('local-player');
        setConnectionStatus('connected');

        client.on('user-published', async (user, mediaType) => {
          await client.subscribe(user, mediaType);

          if (mediaType === 'video') {
            const container = document.getElementById('remote-player-container');
            container.innerHTML = ''; // Clear previous video if any

            const remoteContainer = document.createElement('div');
            remoteContainer.id = `remote-player-${user.uid}`;
            remoteContainer.className = 'remote-video';
            container.appendChild(remoteContainer);

            user.videoTrack.play(remoteContainer.id);
          }

          if (mediaType === 'audio') {
            user.audioTrack.play();
          }
        });

        client.on('user-unpublished', () => {
          const container = document.getElementById('remote-player-container');
          if (container) container.innerHTML = '';
        });
      } catch (error) {
        console.error('Agora init failed:', error);
        alert('Failed to connect to video session.');
      }
    };

    initAgora();

    return () => {
      const cleanup = async () => {
        localVideoTrack?.stop();
        localVideoTrack?.close();
        localAudioTrack?.stop();
        localAudioTrack?.close();
        await client.leave();
      };
      cleanup();
    };
  }, []);

  const toggleMute = () => {
    if (localAudioTrack) {
      const muted = !isMuted;
      localAudioTrack.setEnabled(!muted);
      setIsMuted(muted);
    }
  };

  const toggleVideo = () => {
    if (localVideoTrack) {
      const videoOff = !isVideoOff;
      localVideoTrack.setEnabled(!videoOff);
      setIsVideoOff(videoOff);
    }
  };

  const toggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  const endCall = () => {
    if (window.confirm('Are you sure you want to end this consultation?')) {
      window.location.reload();
    }
  };

  return (
    <div className={`video-screen ${isFullScreen ? 'fullscreen' : ''}`}>
      {connectionStatus === 'connecting' ? (
        <div className="connecting-overlay">
          <div className="connecting-spinner"></div>
          <p>Connecting to Navatar...</p>
        </div>
      ) : (
        <>
          <div className="main-video">
            <div id="remote-player-container" className="remote-video-feed"></div>

            <div className="local-thumbnail">
              <div id="local-player" className="local-video-feed"></div>
              <div className="participant-label">You (Doctor)</div>
            </div>
          </div>

          <div className="video-controls">
            <button className={`control-button ${isMuted ? 'active' : ''}`} onClick={toggleMute}>
              {isMuted ? '🔇' : '🔊'}
              <span className="control-label">{isMuted ? 'Unmute' : 'Mute'}</span>
            </button>

            <button className={`control-button ${isVideoOff ? 'active' : ''}`} onClick={toggleVideo}>
              {isVideoOff ? '📵' : '📹'}
              <span className="control-label">{isVideoOff ? 'Start Video' : 'Stop Video'}</span>
            </button>

            <button className="control-button" onClick={toggleFullScreen}>
              {isFullScreen ? '⬜' : '⬛'}
              <span className="control-label">{isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}</span>
            </button>

            <button className="control-button end-call" onClick={endCall}>
              📞
              <span className="control-label">End Call</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default VideoScreen;
