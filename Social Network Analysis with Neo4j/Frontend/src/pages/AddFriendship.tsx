
import React, { useEffect, useState } from 'react';
import Layout from '@/components/Layout';
import FriendshipForm from '@/components/FriendshipForm';

const AddFriendship = () => {
  // Example people, in a real app these would come from your API
    const [people, setPeople] = useState([]);
  

   useEffect(() => {
      // Fetch locations from Flask backend
      fetch(`${import.meta.env.VITE_API_BASE_URL}/api/people`)
        .then((response) => response.json())
        .then((data) => setPeople(data))
        .catch((error) => console.error('Error fetching locations:', error));
    }, []);

  
  return (
    <Layout>
      <section className="text-center max-w-4xl mx-auto">
        <h2 className="page-title">Add a Friendship</h2>
        <p className="subtitle">
          Create a connection between two people in your social network.
        </p>
        
        <FriendshipForm people={people} />
      </section>
    </Layout>
  );
};

export default AddFriendship;
