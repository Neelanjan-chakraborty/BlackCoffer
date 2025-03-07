import React, { createContext, useContext, useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useToast } from '@/components/ui/use-toast';
import { API_URL } from '@/utils/api';

// Define message type
export interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

export interface ChatSessionData {
  id: string;
  name: string;
  messages: Message[];
  isReadOnly: boolean;
}

interface ChatSessionsContextType {
  chatSessions: ChatSessionData[];
  activeSessionId: string | null;
  setActiveSessionId: (id: string) => void;
  addMessageToActiveSession: (text: string, sender: string) => void;
  createNewChatSession: () => void;
  handleSessionNameChange: (sessionId: string, newName: string) => void;
  isInitialized: boolean;
}

const ChatSessionsContext = createContext<ChatSessionsContextType | undefined>(undefined);

export const ChatSessionsProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [chatSessions, setChatSessions] = useState<ChatSessionData[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const { toast } = useToast();

  // Load chat sessions from localStorage on component mount
  useEffect(() => {
    const loadChatSessions = () => {
      try {
        const savedSessions = localStorage.getItem('chatSessions');
        const savedActiveSessionId = localStorage.getItem('activeSessionId');
        
        if (savedSessions) {
          // Parse the JSON string and convert timestamp strings back to Date objects
          const parsedSessions = JSON.parse(savedSessions).map((session: any) => ({
            ...session,
            messages: session.messages.map((msg: any) => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }))
          }));
          
          setChatSessions(parsedSessions);
          
          if (savedActiveSessionId && parsedSessions.some(s => s.id === savedActiveSessionId)) {
            setActiveSessionId(savedActiveSessionId);
          } else if (parsedSessions.length > 0) {
            setActiveSessionId(parsedSessions[0].id);
          }
        } else {
          // Initialize with a default empty session if none exists
          const defaultSession = { 
            id: uuidv4(), 
            name: 'New Chat',
            messages: [], 
            isReadOnly: false 
          };
          setChatSessions([defaultSession]);
          setActiveSessionId(defaultSession.id);
        }
        
        setIsInitialized(true);
      } catch (error) {
        console.error('Error loading chat sessions:', error);
        // Initialize with default if there's an error
        const defaultSession = { 
          id: uuidv4(), 
          name: 'New Chat',
          messages: [], 
          isReadOnly: false 
        };
        setChatSessions([defaultSession]);
        setActiveSessionId(defaultSession.id);
        setIsInitialized(true);
        
        toast({
          title: "Error",
          description: "Failed to load previous chat sessions",
          variant: "destructive",
        });
      }
    };

    loadChatSessions();
  }, [toast]);

  // Save chat sessions to localStorage whenever they change
  useEffect(() => {
    if (isInitialized && chatSessions.length > 0) {
      localStorage.setItem('chatSessions', JSON.stringify(chatSessions));
    }
  }, [chatSessions, isInitialized]);

  // Save active session ID to localStorage when it changes
  useEffect(() => {
    if (isInitialized && activeSessionId) {
      localStorage.setItem('activeSessionId', activeSessionId);
    }
  }, [activeSessionId, isInitialized]);

  // Fetch chat history if needed
  useEffect(() => {
    if (!isInitialized || !activeSessionId) return;

    const fetchChatHistory = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.error('No token found. Please log in.');
          return;
        }
  
        const response = await fetch(`${API_URL}/messages`, {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
  
        if (!response.ok) {
          throw new Error('Failed to fetch chat history');
        }
  
        const data = await response.json();
        const messagesData = data.map((msg: any) => ({
          id: msg.id || uuidv4(),
          text: msg.content || msg.text,
          sender: msg.sender,
          timestamp: new Date(msg.timestamp),
        }));

        // Only update if we don't already have sessions with messages
        setChatSessions(prev => {
          // If we already have sessions with messages, keep them
          if (prev.some(session => session.messages.length > 0)) {
            return prev;
          }
          
          // Otherwise, update the first session with fetched messages
          if (prev.length === 0) {
            const newSession = { 
              id: uuidv4(),
              name: 'Chat History', 
              messages: messagesData, 
              isReadOnly: false 
            };
            setActiveSessionId(newSession.id);
            return [newSession];
          }
          
          const updatedSessions = [...prev];
          updatedSessions[0] = {
            ...updatedSessions[0],
            messages: messagesData
          };
          
          return updatedSessions;
        });
      } catch (error) {
        console.error('Error fetching chat history:', error);
      }
    };
  
    // Only fetch chat history if we don't already have messages
    if (!chatSessions.some(session => session.messages.length > 0)) {
      fetchChatHistory();
    }
  }, [isInitialized, activeSessionId, chatSessions]);
  
  // Add a message to the active chat session
  const addMessageToActiveSession = (text: string, sender: string) => {
    if (!activeSessionId) return;
    
    setChatSessions(prev => prev.map(session => {
      if (session.id === activeSessionId && !session.isReadOnly) {
        return {
          ...session,
          messages: [
            ...session.messages,
            { 
              id: uuidv4(), 
              text, 
              sender, 
              timestamp: new Date() 
            }
          ]
        };
      }
      return session;
    }));
  };

  // Create a new chat session
  const createNewChatSession = () => {
    // Make all existing sessions read-only
    setChatSessions(prev => prev.map(session => ({
      ...session,
      isReadOnly: true
    })));

    // Add a new active session
    const newSessionId = uuidv4();
    setChatSessions(prev => [
      ...prev,
      { 
        id: newSessionId, 
        name: `New Chat ${prev.length + 1}`,
        messages: [], 
        isReadOnly: false 
      }
    ]);
    setActiveSessionId(newSessionId);
    
    toast({
      title: "New Chat Session",
      description: "Started a new chat session",
    });
  };

  // Handle session name change
  const handleSessionNameChange = (sessionId: string, newName: string) => {
    setChatSessions(prev => prev.map(session => 
      session.id === sessionId ? { ...session, name: newName } : session
    ));

    toast({
      title: "Session Renamed",
      description: `Chat session renamed to "${newName}"`,
    });
  };

  return (
    <ChatSessionsContext.Provider
      value={{
        chatSessions,
        activeSessionId,
        setActiveSessionId,
        addMessageToActiveSession,
        createNewChatSession,
        handleSessionNameChange,
        isInitialized,
      }}
    >
      {children}
    </ChatSessionsContext.Provider>
  );
};

export const useChatSessions = () => {
  const context = useContext(ChatSessionsContext);
  if (context === undefined) {
    throw new Error('useChatSessions must be used within a ChatSessionsProvider');
  }
  return context;
};
