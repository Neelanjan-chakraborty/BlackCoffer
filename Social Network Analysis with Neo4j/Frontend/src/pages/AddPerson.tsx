import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import PersonForm from '@/components/PersonForm';

const AddPerson = () => {
  const [locations, setLocations] = useState([]);
  const [interests, setInterests] = useState('');


  useEffect(() => {
    // Fetch locations from Flask backend
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/locations`)
      .then((response) => response.json())
      .then((data) => setLocations(data))
      .catch((error) => console.error('Error fetching locations:', error));
  }, []);

  useEffect(() => {
    // fetch interests from Flask backend
    fetch(`${import.meta.env.VITE_API_BASE_URL}/api/interests`)
      .then((response) => response.json())
      .then((data) => setInterests(data))
      .catch((error) => console.error('Error fetching Intrests:', error));
  }, []);

  return (
    <Layout>
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="page-title">Add a Person</h2>
        <p className="subtitle">
          Add a new individual to your social network by providing their details below.
        </p>
        
        <PersonForm locations={locations} />
      </section>
    </Layout>
  );
};

export default AddPerson;