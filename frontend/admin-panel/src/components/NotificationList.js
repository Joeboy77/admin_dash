import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './NotificationList.css';

const NotificationList = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const fetchNotifications = async () => {
      const response = await axios.get('/api/notifications');
      setNotifications(response.data);
    };
    fetchNotifications();
  }, []);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
        {notifications.map(notification => (
          <li key={notification._id}>
            {notification.message}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NotificationList;
