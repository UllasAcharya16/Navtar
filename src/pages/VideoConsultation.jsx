import Navbar from '../components/common/Navbar';
import VideoScreen from '../components/videoCall/VideoScreen';
import JoystickControl from '../components/videoCall/JoystickControl';
import './VideoConsultation.css';

function VideoConsultation() {
  return (
    <div className="video-consultation-page">
<<<<<<< HEAD
      <Navbar />
      
      <div className="consultation-container container">
        <div className="consultation-header">
          <h1>Remote Consultation</h1>
          <p>Room: ICU-503 • Patient: John Smith • Time: {new Date().toLocaleTimeString()}</p>
        </div>
        
=======
      <div className="consultation-container">
        {/* <div className="consultation-header">
          <h1>Remote Consultation</h1>
          <p>Room: ICU-503 • Patient: John Smith • Time: {new Date().toLocaleTimeString()}</p>
        </div> */}

>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
        <div className="consultation-content">
          <div className="video-section">
            <VideoScreen />
          </div>
<<<<<<< HEAD
          
=======

>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
          <div className="controls-section">
            <JoystickControl />
          </div>
        </div>
<<<<<<< HEAD
        
        <div className="patient-info card">
=======

        {/* <div className="patient-info card">
>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
          <h3>Patient Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <span className="info-label">Name:</span>
              <span className="info-value">John Smith</span>
            </div>
            <div className="info-item">
              <span className="info-label">Age:</span>
              <span className="info-value">67</span>
            </div>
            <div className="info-item">
              <span className="info-label">Room:</span>
              <span className="info-value">ICU-503</span>
            </div>
            <div className="info-item">
              <span className="info-label">Admission Date:</span>
              <span className="info-value">May 15, 2025</span>
            </div>
            <div className="info-item">
              <span className="info-label">Primary Condition:</span>
              <span className="info-value">Post-Cardiac Surgery</span>
            </div>
            <div className="info-item">
              <span className="info-label">Attending Nurse:</span>
              <span className="info-value">Sarah Johnson</span>
            </div>
          </div>
<<<<<<< HEAD
        </div>
=======
        </div> */}
>>>>>>> 1f176b0 (🚀 3rd commit: Added updated video screen with mic-level and dynamic layout)
      </div>
    </div>
  );
}

export default VideoConsultation;