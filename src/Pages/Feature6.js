import React, { useState } from 'react';
import '../App.css';

const Feature6 = () => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    location: '',
    complaintType: 'general',
    description: '',
    priority: 'medium'
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the complaint to your backend
    alert('Complaint submitted successfully! We will get back to you soon.');
    setFormData({
      name: '',
      phone: '',
      location: '',
      complaintType: 'general',
      description: '',
      priority: 'medium'
    });
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="feature-container">
      <h1>Emergency Helpline</h1>
      <p className="feature-description">Get immediate help and support when you need it most</p>

      {/* Emergency Numbers Section */}
      <section className="emergency-section">
        <h2>Emergency Numbers</h2>
        <div className="emergency-grid">
          <div className="emergency-card">
            <span className="emergency-icon">🚔</span>
            <h3>Police</h3>
            <p className="emergency-number">100</p>
            <p className="emergency-description">24/7 Emergency Response</p>
          </div>
          <div className="emergency-card">
            <span className="emergency-icon">🚑</span>
            <h3>Ambulance</h3>
            <p className="emergency-number">108</p>
            <p className="emergency-description">Medical Emergency</p>
          </div>
          <div className="emergency-card">
            <span className="emergency-icon">🚒</span>
            <h3>Fire</h3>
            <p className="emergency-number">101</p>
            <p className="emergency-description">Fire Emergency</p>
          </div>
          <div className="emergency-card">
            <span className="emergency-icon">👮</span>
            <h3>Women Helpline</h3>
            <p className="emergency-number">1091</p>
            <p className="emergency-description">Women's Safety</p>
          </div>
        </div>
      </section>

      {/* Complaint Form Section */}
      <section className="complaint-section">
        <h2>File a Complaint</h2>
        <form onSubmit={handleSubmit} className="complaint-form">
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="complaintType">Complaint Type</label>
            <select
              id="complaintType"
              name="complaintType"
              value={formData.complaintType}
              onChange={handleChange}
              required
            >
              <option value="general">General Complaint</option>
              <option value="harassment">Harassment</option>
              <option value="stalking">Stalking</option>
              <option value="threat">Threat</option>
              <option value="other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="priority">Priority Level</label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              required
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="description">Complaint Description</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows="4"
            />
          </div>

          <button type="submit" className="submit-button">Submit Complaint</button>
        </form>
      </section>

      {/* Quick Actions Section */}
      <section className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <button className="action-button">
            <span className="action-icon">📱</span>
            Share Location
          </button>
          <button className="action-button">
            <span className="action-icon">🔔</span>
            Alert Nearby
          </button>
          <button className="action-button">
            <span className="action-icon">📞</span>
            Call Emergency
          </button>
        </div>
      </section>
    </div>
  );
};

export default Feature6;
