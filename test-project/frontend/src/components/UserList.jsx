import React from 'react';

const UserList = ({ users, onDeleteUser, isLoading }) => {
  const formatDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="card">
      <h2 className="card-title">User Greetings ({users.length})</h2>

      {isLoading ? (
        <div className="empty-state">Loading...</div>
      ) : users.length === 0 ? (
        <div className="empty-state">
          No greetings submitted yet. Enter your name above to post a greeting.
        </div>
      ) : (
        <div className="user-list">
          {users.map((user) => (
            <div key={user._id || user.id} className="user-item">
              <div>
                <span className="user-name">{user.name}</span>
                <p className="user-msg">"{user.message || 'Hello User!'}"</p>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <span className="user-time">{formatDate(user.createdAt)}</span>
                <button
                  className="btn-delete"
                  title="Delete entry"
                  onClick={() => onDeleteUser(user._id || user.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserList;
