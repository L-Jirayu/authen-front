import React from 'react';
import './css/Interface.css';

const Interface = () => {
  const handleLogout = async () => {
  try {
    await fetch('http://localhost:3000/auth/logout', {
      method: 'POST',
      credentials: 'include',
    });
  } catch (err) {
    console.error('Logout failed', err);
  }

  window.location.href = '/';
};


  return (
    <div className="interface-container">
      <div className="interface-box">
        <h1>Welcome 👋</h1>
        <p>You have successfully logged in to your account.</p>
        <button className="logout-btn" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Interface;
