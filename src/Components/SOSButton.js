import React, { useState, useEffect } from 'react';
import emailjs from 'emailjs-com';
import '../Components/SOSButton.css';

const SOSButton = () => {
  const [alertSent, setAlertSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [contacts, setContacts] = useState(() => {
    const saved = localStorage.getItem('sosContacts');
    return saved ? JSON.parse(saved) : [{ name: 'Emergency Contact 1', phone: '', email: '' }];
  });
  const [message, setMessage] = useState(() => {
    const saved = localStorage.getItem('sosMessage');
    return saved || 'EMERGENCY: I need help immediately!';
  });
  const [showSettings, setShowSettings] = useState(false);
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      const watchId = navigator.geolocation.watchPosition(
        (position) => {
          setLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        { enableHighAccuracy: true }
      );

      return () => navigator.geolocation.clearWatch(watchId);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('sosContacts', JSON.stringify(contacts));
  }, [contacts]);

  useEffect(() => {
    localStorage.setItem('sosMessage', message);
  }, [message]);

  const triggerSOS = async () => {
    setLoading(true);
    let successCount = 0;
    let failCount = 0;

    try {
      const locationText = location
        ? `My current location: ${location.latitude.toFixed(6)}, ${location.longitude.toFixed(6)}\nGoogle Maps: https://www.google.com/maps?q=${location.latitude},${location.longitude}`
        : 'Location information unavailable';

      const fullMessage = `${message}\n\n${locationText}\n\nThis is an automated emergency alert.`;

      const emailPromises = contacts
        .filter((contact) => contact.email && contact.email.trim() !== '')
        .map(async (contact) => {
          try {
            await emailjs.send(
              'service_w9wewzt',
              'template_tamw173',
              {
                to_name: contact.name,
                to_email: contact.email,
                message: fullMessage,
                subject: 'EMERGENCY ALERT',
              },
              'zraA1hVB3rZV5gy0l'
            );
            successCount++;
          } catch (error) {
            console.error(`Failed to send email to ${contact.email}:`, error);
            failCount++;
          }
        });

      const smsPromises = contacts
        .filter((contact) => contact.phone && contact.phone.trim() !== '')
        .map(async (contact) => {
          try {
            const response = await fetch('https://your-backend-api.com/send-sms', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                to: contact.phone,
                message: `EMERGENCY: ${message} ${location ? `- Location: https://www.google.com/maps?q=${location.latitude},${location.longitude}` : ''}`,
              }),
            });

            if (response.ok) {
              successCount++;
            } else {
              failCount++;
            }
          } catch (error) {
            console.error(`Failed to send SMS to ${contact.phone}:`, error);
            failCount++;
          }
        });

      await Promise.all([...emailPromises, ...smsPromises]);

      setAlertSent(true);
      if (failCount > 0) {
        alert(`Alert sent to ${successCount} contact(s). Failed to reach ${failCount} contact(s).`);
      }
      setTimeout(() => setAlertSent(false), 5000);
    } catch (error) {
      console.error('Error in SOS process:', error);
      alert('There was a problem sending alerts. Please try again or call emergency services directly.');
    } finally {
      setLoading(false);
    }
  };

  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index] = { ...updatedContacts[index], [field]: value };
    setContacts(updatedContacts);
  };

  return (
    <div className="sos-container">
      <div className="sos-card">
        <h1 className="sos-title">Emergency SOS Button</h1>

        <div className="sos-button-container">
          <button
            onClick={triggerSOS}
            disabled={loading || alertSent}
            className={`sos-button ${loading ? 'loading' : alertSent ? 'sent' : ''}`}
          >
            {loading ? 'SENDING...' : alertSent ? 'SENT!' : 'SOS'}
          </button>
        </div>

        <div className="sos-status">
          {loading && <p className="status-sending">Sending emergency alerts...</p>}
          {alertSent && <p className="status-sent">Emergency alerts sent successfully!</p>}
          {!loading && !alertSent && location && (
            <p className="status-location">
              Location ready: {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
            </p>
          )}
        </div>

        <div className="settings-toggle">
          <button onClick={() => setShowSettings(!showSettings)} className="toggle-button">
            {showSettings ? 'Hide Settings' : 'Show Settings'}
          </button>
        </div>

        {showSettings && (
          <div className="settings-panel">
            <h2 className="settings-heading">Emergency Message</h2>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="settings-textarea"
              rows="3"
            />

            <h2 className="settings-heading">Emergency Contacts</h2>
            {contacts.map((contact, index) => (
              <div key={index} className="contact-item">
                <input
                  type="text"
                  placeholder="Contact Name"
                  value={contact.name}
                  onChange={(e) => handleContactChange(index, 'name', e.target.value)}
                  className="contact-input"
                />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  value={contact.phone}
                  onChange={(e) => handleContactChange(index, 'phone', e.target.value)}
                  className="contact-input"
                />
                <input
                  type="email"
                  placeholder="Email Address"
                  value={contact.email}
                  onChange={(e) => handleContactChange(index, 'email', e.target.value)}
                  className="contact-input"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SOSButton;