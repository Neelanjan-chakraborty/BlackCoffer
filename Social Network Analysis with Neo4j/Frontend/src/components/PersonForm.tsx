import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface PersonFormProps {
  locations: string[];
}

const PersonForm: React.FC<PersonFormProps> = ({ locations }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    location: '',
    interests: ''
  });

  const [locationSuggestions, setLocationSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Fetch location suggestions based on user input
  const fetchLocationSuggestions = async (query: string) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations?q=${query}`);
      const data = await response.json();
      setLocationSuggestions(data);
    } catch (error) {
      console.error('Error fetching location suggestions:', error);
    }
  };

  // Handle location input change
  const handleLocationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setFormData({ ...formData, location: value });

    if (value.length > 0) {
      fetchLocationSuggestions(value);
      setShowSuggestions(true);
    } else {
      setShowSuggestions(false);
    }
  };

  // Handle selection of a suggestion
  const handleSuggestionClick = (suggestion: string) => {
    setFormData({ ...formData, location: suggestion });
    setShowSuggestions(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Prepare the data to send to the Flask backend
    const personData = {
      name: formData.name,
      age: parseInt(formData.age),
      location: formData.location,
      interests: formData.interests.split(',').map((interest) => interest.trim()),
    };

    try {
      // Send the data to the Flask backend
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/add_person`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(personData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success(`Added ${formData.name} successfully!`);
        // Reset the form
        setFormData({
          name: '',
          age: '',
          location: '',
          interests: ''
        });
      } else {
        toast.error(result.message || 'Failed to add person.');
      }
    } catch (error) {
      console.error('Error adding person:', error);
      toast.error('An error occurred while adding the person.');
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="staggered-fade-in">
        <div className="form-group">
          <label htmlFor="name" className="input-label">Name:</label>
          <input 
            type="text" 
            id="name" 
            name="name" 
            value={formData.name}
            onChange={handleChange}
            className="form-input" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="age" className="input-label">Age:</label>
          <input 
            type="number" 
            id="age" 
            name="age" 
            value={formData.age}
            onChange={handleChange}
            className="form-input" 
            required 
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="location" className="input-label">Location:</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleLocationChange}
            className="form-input"
            placeholder="Enter a location"
            required
          />
          {showSuggestions && locationSuggestions.length > 0 && (
            <ul className="suggestions-list">
              {locationSuggestions.map((suggestion, index) => (
                <li
                  key={index}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="suggestion-item"
                >
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="interests" className="input-label">Interests (comma-separated):</label>
          <input 
            type="text" 
            id="interests" 
            name="interests" 
            value={formData.interests}
            onChange={handleChange}
            className="form-input" 
          />
        </div>
        
        <button type="submit" className="btn-primary w-full">Add Person</button>
      </form>
    </div>
  );
};

export default PersonForm;