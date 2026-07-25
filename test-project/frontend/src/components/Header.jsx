import React from 'react';

const Header = ({ isConnected }) => {
  return (
    <header className="header">
      <div>
        <h1 className="brand-title">Hello User</h1>
        <p className="brand-subtitle">Simple Greeting Web Application</p>
      </div>

      <div className="health-badge">
        <span className={`status-dot ${isConnected ? 'connected' : 'disconnected'}`}></span>
        <span>
          Server {isConnected ? 'Connected' : 'Offline'}
        </span>
      </div>
    </header>
  );
};

export default Header;
