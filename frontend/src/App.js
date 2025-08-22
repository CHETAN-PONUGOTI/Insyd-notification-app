import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import NotificationList from './components/NotificationList';
import './App.css';

const MOCK_USERS = Array.from({ length: 100 }, (_, i) => `user_${i + 1}`);
const API_URL = 'https://insyd-notification-app-1.onrender.com/api';

const POST_TITLES = [
  "New Urban Design Project: The Green City Initiative",
  "Reviving Historical Architecture: A Case Study",
  "Sustainable Housing: Future of Residential Design",
  "The Role of AI in Modern Architecture",
  "A Glimpse into the World of Frank Lloyd Wright",
  "Innovative Bridge Designs of the 21st Century",
  "Redefining Public Spaces: A Community-Led Approach",
  "Behind the Scenes of the Burj Khalifa Construction"
];

function App() {
  const [userId, setUserId] = useState(MOCK_USERS[0]);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [eventType, setEventType] = useState('like_post'); // New state for event type

  const fetchNotifications = useCallback(async () => {
    if (!userId) return;
    try {
      const response = await axios.get(`${API_URL}/notifications/${userId}`);
      setNotifications(response.data.notifications);
      setError(null);
    } catch (err) {
      setError('Failed to fetch notifications.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchNotifications();
    const intervalId = setInterval(fetchNotifications, 5000);
    return () => clearInterval(intervalId);
  }, [fetchNotifications]);

  const handleTriggerEvent = async () => {
    try {
      const sourceUser = MOCK_USERS[Math.floor(Math.random() * 100)];
      const targetUser = userId;
      
      const eventData = {
        type: eventType, // Use the state variable for event type
        sourceUserId: sourceUser,
        targetUserId: targetUser,
        data: {}
      };

      if (eventType === 'like_post') {
        eventData.data.postTitle = POST_TITLES[Math.floor(Math.random() * POST_TITLES.length)];
      }

      await axios.post(`${API_URL}/events`, eventData);
      
      fetchNotifications();
      
      alert('Event sent successfully!');
    } catch (err) {
      alert('Error triggering event.');
      console.error(err);
    }
  };

  return (
    <div className="App">
      <div class="header">
        <img src="https://iili.io/K9ihHOX.jpg" alt="insyd_image" class="img" />
        <h1>Notification</h1>
        <div className="user-selector">
          <label htmlFor="user-select" class="user-select">Select User: </label>
          <select id="user-select" value={userId} onChange={(e) => setUserId(e.target.value)}>
            {MOCK_USERS.map(u => (
              <option key={u} value={u}>{u}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div className="event-selector">
        <label htmlFor="event-select">Select Event Type: </label>
        <select id="event-select" value={eventType} onChange={(e) => setEventType(e.target.value)}>
          <option value="like_post">Like Post</option>
          <option value="follow_user">Follow User</option>
        </select>
      </div>

      <button onClick={handleTriggerEvent}>
        Trigger Event for Current User
      </button>

      <h2>Notifications for {userId}</h2>
      {loading && <p>Loading notifications...</p>}
      {error && <p className="error">{error}</p>}
      {!loading && !error && <NotificationList notifications={notifications} />}
    </div>
  );
}

export default App;