import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import './Login.css';

function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
<<<<<<< HEAD

  const { login } = useAuth();
  const navigate = useNavigate();

=======
  
  const { login } = useAuth();
  const navigate = useNavigate();
  
>>>>>>> b9e534f (Initial commit after local changes)
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
<<<<<<< HEAD

  const demoUsers = [
    {
      email: 'doctor@example.com',
      password: 'password',
      user: { id: '1', name: 'Sarah Johnson', email: 'doctor@example.com', role: 'doctor' }
    },
    {
      email: 'doctor2@example.com',
      password: 'password',
      user: { id: '2', name: 'John Smith', email: 'doctor2@example.com', role: 'doctor' }
    }
  ];

=======
  
>>>>>>> b9e534f (Initial commit after local changes)
  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
<<<<<<< HEAD

    const matchedUser = demoUsers.find(u =>
      u.email === formData.email && u.password === formData.password
    );

    if (matchedUser) {
      login(matchedUser.user);
=======
    
    // Demo credentials check (replace with actual authentication in production)
    if (formData.email === 'doctor@example.com' && formData.password === 'password') {
      // Login successful
      login({
        id: '1',
        name: 'Sarah Johnson',
        email: formData.email,
        role: 'doctor'
      });
>>>>>>> b9e534f (Initial commit after local changes)
      navigate('/booking');
    } else {
      setError('Invalid credentials. Please try again.');
    }
<<<<<<< HEAD

    setLoading(false);
  };


  return (
    <div className="login-page">
      <Navbar />

=======
    
    setLoading(false);
  };
  
  return (
    <div className="login-page">
      <Navbar />
      
>>>>>>> b9e534f (Initial commit after local changes)
      <div className="login-container container fade-in">
        <div className="login-card card">
          <div className="login-header">
            <h2>Doctor Login</h2>
            <p>Sign in to access the Navatar remote consultation system</p>
          </div>
<<<<<<< HEAD

          {error && <div className="error-message">{error}</div>}

=======
          
          {error && <div className="error-message">{error}</div>}
          
>>>>>>> b9e534f (Initial commit after local changes)
          <form onSubmit={handleSubmit} className="login-form">
            <div className="form-group">
              <label htmlFor="email" className="form-label">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-input"
                value={formData.email}
                onChange={handleChange}
                required
                placeholder="your.email@hospital.com"
              />
            </div>
<<<<<<< HEAD

=======
            
>>>>>>> b9e534f (Initial commit after local changes)
            <div className="form-group">
              <label htmlFor="password" className="form-label">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                className="form-input"
                value={formData.password}
                onChange={handleChange}
                required
                placeholder="••••••••"
              />
            </div>
<<<<<<< HEAD

            <div className="form-footer">
              <button
                type="submit"
=======
            
            <div className="form-footer">
              <button 
                type="submit" 
>>>>>>> b9e534f (Initial commit after local changes)
                className="btn btn-primary btn-lg login-button"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </button>
            </div>
          </form>
<<<<<<< HEAD

=======
          
>>>>>>> b9e534f (Initial commit after local changes)
          <div className="login-help">
            <p>
              <small>
                Demo credentials: <br />
                Email: doctor@example.com <br />
                Password: password
              </small>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;