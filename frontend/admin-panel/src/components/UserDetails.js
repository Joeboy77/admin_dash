import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './UserDetails.css';

const UserDetails = ({ userId }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(`/api/users/${userId}`);
      setUser(response.data);
    };
    fetchUser();
  }, [userId]);

  if (!user) return <p>Loading...</p>;

  return (
    <div>
      <h2>User Details</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
      <p>Address: {user.address}</p>
      <p>Phone: {user.phone}</p>
    </div>
  );
};

export default UserDetails;
