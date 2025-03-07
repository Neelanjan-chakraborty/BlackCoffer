import React, { useRef, useEffect, useState } from 'react';
import { Send, Edit2, Check, X, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import ChatMessage from '@/components/ChatMessage';

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatSessionProps {
  messages: Message[];
  isReadOnly: boolean;
  username?: string;
  onSendMessage?: (text: string) => void;
  sessionName?: string;
  onSessionNameChange?: (name: string) => void;
}

const quickChatPrompts = [
  "How are you today?",
  "Can you help me with something?",
  "What's new?",
  "Tell me more about that"
];

const ChatSession: React.FC<ChatSessionProps> = ({
  messages,
  isReadOnly,
  username,
  onSendMessage,
  sessionName = "Chat Session",
  onSessionNameChange,
}) => {
  const [message, setMessage] = useState('');
  const [isEditingName, setIsEditingName] = useState(false);
  const [editedSessionName, setEditedSessionName] = useState(sessionName);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Focus the name input when editing
  useEffect(() => {
    if (isEditingName) {
      nameInputRef.current?.focus();
    }
  }, [isEditingName]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (message.trim() && onSendMessage) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    if (onSendMessage) {
      onSendMessage(prompt);
    }
  };

  const handleSaveSessionName = () => {
    if (onSessionNameChange && editedSessionName.trim()) {
      onSessionNameChange(editedSessionName);
    }
    setIsEditingName(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveSessionName();
    } else if (e.key === 'Escape') {
      setEditedSessionName(sessionName);
      setIsEditingName(false);
    }
  };

  return (
    <div className={`glass-morphism rounded-xl overflow-hidden shadow-neon-sm flex-1 flex flex-col ${isReadOnly ? 'opacity-90' : ''}`}>
      {/* Chat Header */}
      <div className="p-4 border-b border-white/10 backdrop-blur-md bg-black/20 flex justify-between">
        <div className="flex items-center gap-2">
          {isEditingName ? (
            <div className="flex items-center gap-2">
              <Input
                ref={nameInputRef}
                value={editedSessionName}
                onChange={(e) => setEditedSessionName(e.target.value)}
                onKeyDown={handleKeyDown}
                className="bg-white/10 border-white/20 text-white w-48"
                placeholder="Session name"
              />
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={handleSaveSessionName}
                className="text-green-400 hover:text-green-300 hover:bg-white/10"
              >
                <Check className="w-4 h-4" />
              </Button>
              <Button 
                size="icon" 
                variant="ghost" 
                onClick={() => {
                  setEditedSessionName(sessionName);
                  setIsEditingName(false);
                }}
                className="text-red-400 hover:text-red-300 hover:bg-white/10"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <>
              <h2 className="text-xl font-bold">{sessionName}</h2>
              {!isReadOnly && onSessionNameChange && (
                <Button 
                  size="icon" 
                  variant="ghost" 
                  onClick={() => setIsEditingName(true)}
                  className="text-white/70 hover:text-white hover:bg-white/10"
                >
                  <Edit2 className="w-4 h-4" />
                </Button>
              )}
            </>
          )}
        </div>
        <div className="flex items-center gap-2">
          <div className="text-sm text-white/70">{messages.length} messages</div>
          {isReadOnly && (
            <div className="px-3 py-1 bg-yellow-500/20 text-yellow-300 rounded-full text-xs font-medium border border-yellow-500/30">
              Read Only
            </div>
          )}
        </div>
      </div>
      
      {/* Messages Container */}
      <div className={`flex-1 overflow-y-auto p-4 space-y-4 subtle-grid ${isReadOnly ? 'bg-black/20' : ''}`}>
        {messages.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-white/50">
            <p className="text-lg">No messages yet</p>
            <p className="text-sm">Start the conversation!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <ChatMessage
              key={msg.id}
              message={msg}
              isCurrentUser={msg.sender === username}
            />
          ))
        )}
        <div ref={messagesEndRef} />
      </div>
      
      {/* Message Input - Only shown if not read-only */}
      {!isReadOnly && (
        <div className="border-t border-white/10 backdrop-blur-md bg-black/20">
          {/* Quick chat prompts */}
          <div className="p-2 flex gap-2 overflow-x-auto scrollbar-none">
            {quickChatPrompts.map((prompt, index) => (
              <Button 
                key={index}
                variant="outline"
                size="sm"
                onClick={() => handleQuickPrompt(prompt)}
                className="whitespace-nowrap bg-white/5 border-white/10 hover:bg-white/10 text-white/80 hover:text-white flex items-center gap-1"
              >
                <Zap className="w-3 h-3 text-purple-400" />
                {prompt}
              </Button>
            ))}
          </div>
          
          {/* Message input form */}
          <form onSubmit={handleSendMessage} className="p-3 flex items-center gap-2">
            <Input
              className="flex-1 bg-white/5 border-white/10 focus:border-white/30 text-white placeholder:text-white/50"
              placeholder="Type a message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <Button
              type="submit"
              className="bg-purple-pink-gradient hover:shadow-neon-sm transition-all duration-300"
              disabled={!message.trim()}
            >
              <Send className="w-5 h-5" />
            </Button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ChatSession;
