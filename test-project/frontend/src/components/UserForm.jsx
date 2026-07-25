import React, { useState } from 'react';

const UserForm = ({ onAddUser, isSubmitting }) => {
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim()) return;

    onAddUser({ name, message });
    setName('');
    setMessage('');
  };

  return (
    <div className="card">
      <h2 className="card-title">Add Greeting</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label className="form-label" htmlFor="user-name">Your Name *</label>
          <input
            id="user-name"
            type="text"
            className="form-input"
            placeholder="e.g. Alex"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label className="form-label" htmlFor="user-msg">Greeting Message</label>
          <input
            id="user-msg"
            type="text"
            className="form-input"
            placeholder="e.g. Welcome to my website!"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="btn-primary"
          disabled={isSubmitting || !name.trim()}
        >
          {isSubmitting ? 'Saving...' : 'Submit'}
        </button>
      </form>
    </div>
  );
};

export default UserForm;
