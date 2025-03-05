import React, { useState } from 'react';

const PersonForm = ({ locations }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [location, setLocation] = useState('');
  const [interests, setInterests] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const personData = {
      name,
      age: parseInt(age),
      location,
      interests: interests.split(',').map((interest) => interest.trim()),
    };

    try {
      const response = await fetch('http://127.0.0.1:5001/api/add_person', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      const result = await response.json();
      setMessage(result.message);
    } catch (error) {
      console.error('Error adding person:', error);
      setMessage('Failed to add person.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="age">Age:</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          required
        />
      </div>
      <div>
        <label htmlFor="location">Location:</label>
        <select
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        >
          <option value="">Select a location</option>
          {locations.map((loc) => (
            <option key={loc} value={loc}>
              {loc}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label htmlFor="interests">Interests (comma-separated):</label>
        <input
          type="text"
          id="interests"
          value={interests}
          onChange={(e) => setInterests(e.target.value)}
        />
      </div>
      <button type="submit">Add Person</button>
      {message && <p>{message}</p>}
    </form>
  );
};

export default PersonForm;