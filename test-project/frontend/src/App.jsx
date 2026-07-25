import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import UserForm from './components/UserForm';
import UserList from './components/UserList';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

function App() {
  const [users, setUsers] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [latestGreeting, setLatestGreeting] = useState('User');

  // Check Server Health
  const checkHealth = async () => {
    try {
      const res = await fetch(`${API_BASE_URL}/health`);
      setIsConnected(res.ok);
    } catch (err) {
      setIsConnected(false);
    }
  };

  // Fetch Users
  const fetchUsers = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(`${API_BASE_URL}/users`);
      if (res.ok) {
        const result = await res.json();
        setUsers(result.data || []);
        if (result.data && result.data.length > 0) {
          setLatestGreeting(result.data[0].name);
        }
      }
    } catch (err) {
      console.warn('API connection pending.');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    checkHealth();
    fetchUsers();

    const interval = setInterval(checkHealth, 10000);
    return () => clearInterval(interval);
  }, []);

  // Add User
  const handleAddUser = async (userPayload) => {
    setIsSubmitting(true);
    setLatestGreeting(userPayload.name);

    try {
      if (isConnected) {
        const res = await fetch(`${API_BASE_URL}/users`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userPayload),
        });

        if (res.ok) {
          const result = await res.json();
          setUsers((prev) => [result.data, ...prev]);
        }
      } else {
        const mockUser = {
          _id: Date.now().toString(),
          ...userPayload,
          createdAt: new Date().toISOString(),
        };
        setUsers((prev) => [mockUser, ...prev]);
      }
    } catch (err) {
      console.error('Error adding user:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete User
  const handleDeleteUser = async (id) => {
    try {
      if (isConnected) {
        await fetch(`${API_BASE_URL}/users/${id}`, { method: 'DELETE' });
      }
      setUsers((prev) => prev.filter((u) => (u._id || u.id) !== id));
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  };

  return (
    <div className="app-container">
      <Header isConnected={isConnected} />

      {/* Hero Banner */}
      <section className="greeting-hero">
        <h2 className="hero-heading">Hello, {latestGreeting}</h2>
        <p className="hero-subtext">
          A basic user greeting web application built with React, Node.js, Express, and MongoDB.
        </p>
      </section>

      {/* Main Content Grid */}
      <main className="main-grid">
        <UserForm onAddUser={handleAddUser} isSubmitting={isSubmitting} />
        <UserList users={users} onDeleteUser={handleDeleteUser} isLoading={isLoading} />
      </main>

      {/* Footer */}
      <footer className="dev-banner">
        <div>
          <span>API: </span>
          <span className="dev-code">{API_BASE_URL}/users</span>
        </div>
        <div>
          <span>Status: </span>
          <span className="dev-code">{isConnected ? 'Connected' : 'Offline'}</span>
        </div>
      </footer>
    </div>
  );
}

export default App;