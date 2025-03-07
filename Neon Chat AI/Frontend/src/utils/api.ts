export const API_URL = 'http://127.0.0.1:5000';

// Helper function to handle fetch responses
const handleResponse = async (response: Response) => {
  if (response.status === 401) {
    logout();
    throw new Error('Unauthorized - Please log in again.');
  }

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Something went wrong');
  }

  return data;
};

// Login function
export const login = async (username: string, password: string) => {
  console.log(`Attempting login with username: ${username}`); // Log the username

  const response = await fetch(`${API_URL}/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Login failed:", errorData.message); // Log the error message
    throw new Error(errorData.message || 'Login failed');
  }

  const data = await response.json();
  localStorage.setItem('token', data.token); // Store token after login
  console.log("Login successful. Token stored:", data.token); // Log the token
  return data;
};

// Register function
export const register = async (username: string, password: string) => {
  const response = await fetch(`${API_URL}/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });

  return handleResponse(response);
};

// Get user profile
export const getProfile = async () => {
  const token = localStorage.getItem('token');

  if (!token) throw new Error('Not authenticated');

  const response = await fetch(`${API_URL}/profile`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  return handleResponse(response);
};

// Logout function
export const logout = () => {
  localStorage.removeItem('token');
  window.location.reload(); // Optional: Force UI refresh
};

import { io, Socket } from 'socket.io-client';
import { useEffect, useState } from 'react';

let socketInstance: Socket | null = null;

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);

  const connectToChat = () => {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('No token found. Please log in first.');
      return null;
    }

    if (!socketInstance) {
      socketInstance = io('http://localhost:5000', {
        auth: { token }, // Send token in auth
      });

      socketInstance.on('connect', () => {
        console.log('Connected to WebSocket server!');
      });

      socketInstance.on('connect_error', (err) => {
        console.error('WebSocket connection failed:', err.message);
      });

      socketInstance.on('error', (err) => {
        console.error('WebSocket error:', err.message);
      });
    }

    setSocket(socketInstance);
    return socketInstance;
  };

  const disconnectFromChat = () => {
    if (socketInstance) {
      socketInstance.disconnect();
      socketInstance = null;
      setSocket(null);
    }
  };

  useEffect(() => {
    return () => {
      disconnectFromChat();
    };
  }, []);

  return { socket, connectToChat, disconnectFromChat };
};