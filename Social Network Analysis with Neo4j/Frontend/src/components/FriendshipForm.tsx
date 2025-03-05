import React, { useState } from 'react';
import { toast } from 'sonner';

interface FriendshipFormProps {
  people: string[];
}

const FriendshipForm: React.FC<FriendshipFormProps> = ({ people }) => {
  const [formData, setFormData] = useState({
    person1: people[0] || '',
    person2: people.length > 1 ? people[1] : people[0] || ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prevent a person from being friends with themselves
    if (formData.person1 === formData.person2) {
      toast.error("A person cannot be friends with themselves.");
      return;
    }

    try {
      // Send the friendship data to the Flask backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/add_friendship`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          person1: formData.person1,
          person2: formData.person2,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Added friendship between ${formData.person1} and ${formData.person2}!`);
        // Reset the form
        setFormData({
          person1: people[0] || '',
          person2: people.length > 1 ? people[1] : people[0] || ''
        });
      } else {
        toast.error(result.message || 'Failed to add friendship.');
      }
    } catch (error) {
      console.error('Error adding friendship:', error);
      toast.error('An error occurred while adding the friendship.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="staggered-fade-in">
        <div className="form-group">
          <label htmlFor="person1" className="input-label">Person 1:</label>
          <select 
            id="person1" 
            name="person1" 
            value={formData.person1}
            onChange={handleChange}
            className="form-input" 
            required
          >
            {people.map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="person2" className="input-label">Person 2:</label>
          <select 
            id="person2" 
            name="person2" 
            value={formData.person2}
            onChange={handleChange}
            className="form-input" 
            required
          >
            {people.map(person => (
              <option key={person} value={person}>{person}</option>
            ))}
          </select>
        </div>
        
        <button type="submit" className="btn-primary w-full">Add Friendship</button>
      </form>
    </div>
  );
};

export default FriendshipForm;