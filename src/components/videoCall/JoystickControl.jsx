import { useState, useRef, useEffect } from 'react';
import './JoystickControl.css';
<<<<<<< HEAD

function JoystickControl() {
=======
import mqttClient from './mqttClient';

function JoystickControl() {
  const [botStatus, setBotStatus] = useState('Waiting for Bot');
>>>>>>> b9e534f (Initial commit after local changes)
  const joystickRef = useRef(null);
  const handleRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [speed, setSpeed] = useState(0);
  const [direction, setDirection] = useState('Stopped');
<<<<<<< HEAD
  const [robotStatus, setRobotStatus] = useState('Ready');
  
  // Calculate speed and direction based on joystick position
  useEffect(() => {
    // Calculate distance from center (speed)
    const distance = Math.sqrt(position.x ** 2 + position.y ** 2);
    const maxDistance = 50; // Max joystick travel distance
    const normalizedSpeed = Math.min(Math.round((distance / maxDistance) * 100), 100);
    setSpeed(normalizedSpeed);
    
    // Calculate direction based on angle
    if (normalizedSpeed < 10) {
      setDirection('Stopped');
    } else {
      // Negate the Y value to fix the direction
      const angle = Math.atan2(-position.y, position.x) * (180 / Math.PI);
      
      if (angle >= -22.5 && angle < 22.5) {
        setDirection('Right');
      } else if (angle >= 22.5 && angle < 67.5) {
        setDirection('Forward-Right');
      } else if (angle >= 67.5 && angle < 112.5) {
        setDirection('Forward');
      } else if (angle >= 112.5 && angle < 157.5) {
        setDirection('Forward-Left');
      } else if (angle >= 157.5 || angle < -157.5) {
        setDirection('Left');
      } else if (angle >= -157.5 && angle < -112.5) {
        setDirection('Backward-Left');
      } else if (angle >= -112.5 && angle < -67.5) {
        setDirection('Backward');
      } else if (angle >= -67.5 && angle < -22.5) {
        setDirection('Backward-Right');
      }
    }
    
    // Update robot status based on speed
    if (normalizedSpeed > 0) {
      setRobotStatus('Moving');
    } else {
      setRobotStatus('Ready');
    }
  }, [position]);
  
  const handleStart = (clientX, clientY) => {
    if (!joystickRef.current || !handleRef.current) return;
    
    setIsDragging(true);
    
    const joystickRect = joystickRef.current.getBoundingClientRect();
    const centerX = joystickRect.width / 2;
    const centerY = joystickRect.height / 2;
    
    updateHandlePosition(clientX, clientY, centerX, centerY, joystickRect);
  };
  
  const handleMove = (clientX, clientY) => {
    if (!isDragging || !joystickRef.current) return;
    
    const joystickRect = joystickRef.current.getBoundingClientRect();
    const centerX = joystickRect.width / 2;
    const centerY = joystickRect.height / 2;
    
    updateHandlePosition(clientX, clientY, centerX, centerY, joystickRect);
  };
  
  const updateHandlePosition = (clientX, clientY, centerX, centerY, joystickRect) => {
    // Calculate position relative to center
    let relativeX = clientX - joystickRect.left - centerX;
    let relativeY = clientY - joystickRect.top - centerY;
    
    // Limit to circular area
    const distance = Math.sqrt(relativeX ** 2 + relativeY ** 2);
    const maxDistance = 50; // Max joystick travel
    
    if (distance > maxDistance) {
      const angle = Math.atan2(relativeY, relativeX);
      relativeX = Math.cos(angle) * maxDistance;
      relativeY = Math.sin(angle) * maxDistance;
    }
    
    setPosition({ x: relativeX, y: relativeY });
  };
  
  const handleEnd = () => {
    setIsDragging(false);
    // Return to center (spring effect)
    setPosition({ x: 0, y: 0 });
  };
  
  // Mouse event handlers
  const onMouseDown = (e) => {
    handleStart(e.clientX, e.clientY);
  };
  
  const onMouseMove = (e) => {
    handleMove(e.clientX, e.clientY);
  };
  
  const onMouseUp = () => {
    handleEnd();
  };
  
  // Touch event handlers
  const onTouchStart = (e) => {
    if (e.touches && e.touches[0]) {
      handleStart(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  
  const onTouchMove = (e) => {
    if (e.touches && e.touches[0]) {
      handleMove(e.touches[0].clientX, e.touches[0].clientY);
    }
  };
  
  const onTouchEnd = () => {
    handleEnd();
  };
  
  // Set up global event listeners
=======
  const [robotStatus, setRobotStatus] = useState('Calibrating...');
  const [mqttStatus, setMqttStatus] = useState('Connecting...');

  // Setup MQTT connection monitoring
  useEffect(() => {
    let isSubscribed = false;

    const handleConnect = () => {
      console.log('✅ MQTT connected');
      setMqttStatus('Connected');
<<<<<<< HEAD
      
=======

>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
      // Add a small delay and check if client is still connected before subscribing
      setTimeout(() => {
        if (mqttClient.connected && !isSubscribed) {
          mqttClient.subscribe('bot/status', (err) => {
            if (!err) {
              console.log('✅ Successfully subscribed to bot/status');
              isSubscribed = true;
            } else {
              console.error('❌ Subscription error:', err);
            }
          });
        }
      }, 100);
    };

    const handleDisconnect = () => {
      console.log('❌ MQTT disconnected');
      setMqttStatus('Disconnected');
      setBotStatus('Waiting for Bot');
      isSubscribed = false;
    };

    const handleError = (error) => {
      console.error('❌ MQTT Error:', error);
      setMqttStatus('Error');
    };

    const handleMessage = (topic, message) => {
      console.log('📨 Received message:', topic, message.toString());
<<<<<<< HEAD
      
=======

>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
      if (topic === 'bot/status') {
        const status = message.toString();
        console.log('📡 Bot status:', status);
        if (status === 'connected') {
          setBotStatus('Ready');
        } else if (status === 'moving') {
          setBotStatus('Moving');
        } else if (status === 'stopped') {
          setBotStatus('Idle');
        } else if (status === 'disconnected') {
          setBotStatus('Disconnected');
        }
      }
    };

    // Add event listeners
    mqttClient.on('connect', handleConnect);
    mqttClient.on('disconnect', handleDisconnect);
    mqttClient.on('error', handleError);
    mqttClient.on('message', handleMessage);

    // If already connected, handle it
    if (mqttClient.connected) {
<<<<<<< HEAD
      
=======

>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
      handleConnect();
    }

    // Cleanup function
    return () => {
      mqttClient.off('connect', handleConnect);
      mqttClient.off('disconnect', handleDisconnect);
      mqttClient.off('error', handleError);
      mqttClient.off('message', handleMessage);
<<<<<<< HEAD
      
=======

>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
      // Don't call mqttClient.end() here as it might be used by other components
    };
  }, []); // Empty dependency array

  // Calculate speed and direction from position
  useEffect(() => {
    const distance = Math.sqrt(position.x ** 2 + position.y ** 2);
    const maxDistance = 50;
    let normalizedSpeed = Math.min(Math.round((distance / maxDistance) * 100), 100);

<<<<<<< HEAD
// Apply a dead zone: treat anything below 15% as STOP
if (normalizedSpeed < 15) {
  normalizedSpeed = 0;
}

setSpeed(normalizedSpeed);

let newDirection = 'Stopped';
if (normalizedSpeed > 0) {
  const angle = Math.atan2(-position.y, position.x) * (180 / Math.PI);
  if (angle >= -22.5 && angle < 22.5) newDirection = 'Right';
  else if (angle >= 22.5 && angle < 67.5) newDirection = 'Forward-Right';
  else if (angle >= 67.5 && angle < 112.5) newDirection = 'Forward';
  else if (angle >= 112.5 && angle < 157.5) newDirection = 'Forward-Left';
  else if (angle >= 157.5 || angle < -157.5) newDirection = 'Left';
  else if (angle >= -157.5 && angle < -112.5) newDirection = 'Backward-Left';
  else if (angle >= -112.5 && angle < -67.5) newDirection = 'Backward';
  else if (angle >= -67.5 && angle < -22.5) newDirection = 'Backward-Right';
}
=======
    // Apply a dead zone: treat anything below 15% as STOP
    if (normalizedSpeed < 15) {
      normalizedSpeed = 0;
    }

    setSpeed(normalizedSpeed);

    let newDirection = 'Stopped';
    if (normalizedSpeed > 0) {
      const angle = Math.atan2(-position.y, position.x) * (180 / Math.PI);
      if (angle >= -22.5 && angle < 22.5) newDirection = 'Right';
      else if (angle >= 22.5 && angle < 67.5) newDirection = 'Forward-Right';
      else if (angle >= 67.5 && angle < 112.5) newDirection = 'Forward';
      else if (angle >= 112.5 && angle < 157.5) newDirection = 'Forward-Left';
      else if (angle >= 157.5 || angle < -157.5) newDirection = 'Left';
      else if (angle >= -157.5 && angle < -112.5) newDirection = 'Backward-Left';
      else if (angle >= -112.5 && angle < -67.5) newDirection = 'Backward';
      else if (angle >= -67.5 && angle < -22.5) newDirection = 'Backward-Right';
    }
>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)

    setDirection(newDirection);
    setRobotStatus(normalizedSpeed > 0 ? 'Moving' : 'Ready');

    // Only publish if connected and not disconnecting
    if (mqttClient.connected) {
<<<<<<< HEAD
  // Create and adjust the command
  const command = {
    direction: normalizedSpeed === 0 ? 'Stop' : newDirection,
    speed: normalizedSpeed
  };

  // Only publish meaningful commands
  mqttClient.publish('robot/control', JSON.stringify(command), (err) => {
    if (!err) {
      console.log('📤 Published command:', command);
    } else {
      console.error('❌ Publish error:', err);
    }
  });
}
=======
      // Create and adjust the command
      const command = {
        direction: normalizedSpeed === 0 ? 'Stop' : newDirection,
        speed: normalizedSpeed
      };

      // Only publish meaningful commands
      mqttClient.publish('robot/control', JSON.stringify(command), (err) => {
        if (!err) {
          console.log('📤 Published command:', command);
        } else {
          console.error('❌ Publish error:', err);
        }
      });
    }
>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)

  }, [position]);

  // ... rest of your component code remains the same ...
  const handleStart = (x, y) => {
    if (!joystickRef.current) return;
    setIsDragging(true);
    const rect = joystickRef.current.getBoundingClientRect();
    updateHandlePosition(x, y, rect);
  };

  const handleMove = (x, y) => {
    if (!isDragging || !joystickRef.current) return;
    const rect = joystickRef.current.getBoundingClientRect();
    updateHandlePosition(x, y, rect);
  };

  const updateHandlePosition = (x, y, rect) => {
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    let dx = x - rect.left - centerX;
    let dy = y - rect.top - centerY;
    const distance = Math.sqrt(dx ** 2 + dy ** 2);
    const maxDistance = 50;

    if (distance > maxDistance) {
      const angle = Math.atan2(dy, dx);
      dx = Math.cos(angle) * maxDistance;
      dy = Math.sin(angle) * maxDistance;
    }
    setPosition({ x: dx, y: dy });
  };

  const handleEnd = () => {
    setIsDragging(false);
    setPosition({ x: 0, y: 0 });
  };

  const onMouseDown = e => handleStart(e.clientX, e.clientY);
  const onMouseMove = e => handleMove(e.clientX, e.clientY);
  const onMouseUp = () => handleEnd();
  const onTouchStart = e => e.touches[0] && handleStart(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchMove = e => e.touches[0] && handleMove(e.touches[0].clientX, e.touches[0].clientY);
  const onTouchEnd = () => handleEnd();

>>>>>>> b9e534f (Initial commit after local changes)
  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      document.addEventListener('touchmove', onTouchMove);
      document.addEventListener('touchend', onTouchEnd);
    }
<<<<<<< HEAD
    
=======
>>>>>>> b9e534f (Initial commit after local changes)
    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('touchmove', onTouchMove);
      document.removeEventListener('touchend', onTouchEnd);
    };
  }, [isDragging]);
<<<<<<< HEAD
  
  return (
    <div className="joystick-container">
      <div className="joystick-title">
        <h3>Robot Controls</h3>
        <div className={`status-indicator ${robotStatus.toLowerCase()}`}>
          {robotStatus}
        </div>
      </div>
      
=======

  return (
    <div className="joystick-container">
      <div className="connection-status">
        <p>MQTT: <span className={mqttStatus.toLowerCase()}>{mqttStatus}</span></p>
        <p>Bot: <span className={botStatus === 'Ready' ? 'ready' : 'waiting'}>{botStatus}</span></p>
      </div>

<<<<<<< HEAD
      <div className="joystick-title">
        <h3>Robot Controls</h3>
        <div className={`status-indicator ${mqttStatus.toLowerCase().replace(' ', '-')}`}>
          MQTT: {mqttStatus}
        </div>
      </div>

      <div className="joystick-title">
        <div className={`status-indicator ${robotStatus.toLowerCase().replace(' ', '-')}`}>
          Bot: {robotStatus}
        </div>
      </div>
=======
      {/* <div className="joystick-title">
        <h3>Robot Controls</h3>
      </div> */}
>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)

>>>>>>> b9e534f (Initial commit after local changes)
      <div className="joystick-stats">
        <div className="stat">
          <span className="stat-label">Direction:</span>
          <span className="stat-value">{direction}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Speed:</span>
          <span className="stat-value">{speed}%</span>
        </div>
      </div>
<<<<<<< HEAD
      
      <div 
=======

      <div
>>>>>>> b9e534f (Initial commit after local changes)
        className="joystick-base"
        ref={joystickRef}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
<<<<<<< HEAD
        <div 
          className="joystick-direction-indicator forward">▲</div>
        <div 
          className="joystick-direction-indicator right">▶</div>
        <div 
          className="joystick-direction-indicator backward">▼</div>
        <div 
          className="joystick-direction-indicator left">◀</div>
          
        <div 
          className="joystick-handle"
          ref={handleRef}
          style={{
            transform: `translate(${position.x}px, ${position.y}px)`
          }}
        ></div>
      </div>
      
=======
        <div className="joystick-direction-indicator forward">▲</div>
        <div className="joystick-direction-indicator right">▶</div>
        <div className="joystick-direction-indicator backward">▼</div>
        <div className="joystick-direction-indicator left">◀</div>

        <div
<<<<<<< HEAD
          className="joystick-handle"
          ref={handleRef}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
=======
          ref={handleRef}
          style={{ transform: `translate(${position.x}px, ${position.y}px)` }}
          className={` joystick-handle ${botStatus} === 'Ready' ? ready : waiting`}
>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
        ></div>
      </div>

>>>>>>> b9e534f (Initial commit after local changes)
      <div className="control-instructions">
        <p>Click and drag joystick to navigate robot</p>
        <p>Release to stop movement</p>
      </div>
    </div>
  );
}

export default JoystickControl;