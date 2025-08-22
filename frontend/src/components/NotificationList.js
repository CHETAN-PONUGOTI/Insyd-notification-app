// src/components/NotificationList.js
import React from 'react';
import './NotificationList.css';

const NotificationList = ({ notifications }) => {
  return (
    <div className="notification-container">
      {notifications.length > 0 ? (
        notifications.map(notification => (
          <div key={notification._id} className="notification-card">
            <p className="notification-content">{notification.content}</p>
            <p className="notification-time">
              {new Date(notification.timestamp).toLocaleString()}
            </p>
          </div>
        ))
      ) : (
        <p className="no-notifications">No new notifications.</p>
      )}
    </div>
  );
};

export default NotificationList;