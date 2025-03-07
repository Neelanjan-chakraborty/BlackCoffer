
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { PlusCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose
} from '@/components/ui/dialog';
import { v4 as uuidv4 } from 'uuid';
import { useSocket, API_URL } from '@/utils/api';
import ChatSession from '@/components/ChatSession';
import { useToast } from '@/components/ui/use-toast';

// Define message type
interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatSessionData {
  id: string;
  name: string;
  messages: Message[];
  isReadOnly: boolean;
}

const Chat = () => {
  const { user, isAuthenticated } = useAuth();
  const [chatSessions, setChatSessions] = useState<ChatSessionData[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [socket, setSocket] = useState<any>(null);
  const [showNewChatDialog, setShowNewChatDialog] = useState(false);
  const { connectToChat, disconnectFromChat } = useSocket();
  const { toast } = useToast();
  const [isInitialized, setIsInitialized] = useState(false);

  // If not authenticated, redirect to login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

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
  }, []);

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

  // Connect to socket and load chat history
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
  
    const newSocket = connectToChat();
    if (newSocket) {
      setSocket(newSocket);
  
      const handleMessage = (msg: any) => {
        const parsedMsg = typeof msg === 'string' ? JSON.parse(msg) : msg;
        
        setChatSessions(prev => {
          // Only add the message to the active non-readonly session
          return prev.map(session => {
            if (session.id === activeSessionId && !session.isReadOnly) {
              // Check if this message is already in the session
              const isDuplicate = session.messages.some(
                m => m.text === parsedMsg.text && m.sender === parsedMsg.sender
              );
              
              if (isDuplicate) return session;
              
              return {
                ...session,
                messages: [
                  ...session.messages,
                  {
                    id: uuidv4(),
                    text: parsedMsg.text,
                    sender: parsedMsg.sender,
                    timestamp: new Date()
                  }
                ]
              };
            }
            return session;
          });
        });
      };
  
      newSocket.on('message', handleMessage);
  
      return () => {
        newSocket.off('message', handleMessage);
        disconnectFromChat();
      };
    }
  }, [isInitialized, activeSessionId]);

  // Handle sending a message
  const handleSendMessage = (text: string) => {
    if (text.trim() && socket && user && activeSessionId) {
      const newMessage = {
        text: text,
        sender: user.username,
      };

      // Send message through WebSocket
      socket.emit('message', newMessage);

      // Add message to the current session
      setChatSessions(prev => prev.map(session => {
        if (session.id === activeSessionId) {
          return {
            ...session,
            messages: [
              ...session.messages,
              { ...newMessage, id: uuidv4(), timestamp: new Date() }
            ]
          };
        }
        return session;
      }));
    }
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
    setShowNewChatDialog(false);
    
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
    <div className="min-h-screen w-full pt-20 pb-4 px-4 relative bg-gradient-radial">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-purple-500/20 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-1/3 right-1/3 w-1/3 h-1/3 bg-cyan-500/20 rounded-full blur-[120px]"></div>
        <div className="absolute top-1/3 right-1/4 w-1/4 h-1/4 bg-pink-500/20 rounded-full blur-[80px]"></div>
      </div>
      
      <div className="container mx-auto max-w-4xl h-[calc(100vh-6rem)] animate-page-in flex flex-col gap-4 relative z-10">
        {/* Display all chat sessions */}
        <div className="flex-1 overflow-y-auto space-y-6">
          {chatSessions.map(session => (
            <ChatSession
              key={session.id}
              messages={session.messages}
              isReadOnly={session.isReadOnly}
              username={user?.username}
              onSendMessage={!session.isReadOnly ? handleSendMessage : undefined}
              sessionName={session.name}
              onSessionNameChange={!session.isReadOnly ? (name) => handleSessionNameChange(session.id, name) : undefined}
            />
          ))}
        </div>
        
        {/* New Chat Button */}
        <div className="flex justify-center">
          <Button 
            onClick={() => setShowNewChatDialog(true)}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-neon-sm hover:shadow-neon-md transition-all duration-300"
          >
            <PlusCircle className="w-5 h-5 mr-2" />
            New Chat Session
          </Button>
        </div>
        
        {/* New Chat Confirmation Dialog */}
        <Dialog open={showNewChatDialog} onOpenChange={setShowNewChatDialog}>
          <DialogContent className="glass-morphism border-white/10 text-white backdrop-blur-md">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold">Start New Chat Session?</DialogTitle>
              <DialogDescription className="text-white/70">
                Starting a new chat session will make the current session read-only.
                You won't be able to send messages in previous sessions.
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mt-4">
              <DialogClose asChild>
                <Button variant="outline" className="border-white/20 text-white/70 hover:bg-white/10 hover:text-white">
                  Cancel
                </Button>
              </DialogClose>
              <Button
                onClick={createNewChatSession}
                className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
              >
                Start New Session
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Chat;
