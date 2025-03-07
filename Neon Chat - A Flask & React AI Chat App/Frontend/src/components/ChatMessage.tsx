import React from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface Message {
  id: string;
  text: string;
  sender: string;
  timestamp: Date;
}

interface ChatMessageProps {
  message: Message;
  isCurrentUser: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message, isCurrentUser }) => {
  // Format time to show in the message
  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div
      className={`message-bubble ${
        isCurrentUser ? 'sent' : 'received'
      } animate-fade-in shadow-md`}
    >
      <div className="flex items-start gap-2">
        {!isCurrentUser && (
          <Avatar className="h-8 w-8 border border-white/20 shadow-neon-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.sender}`} />
            <AvatarFallback className="bg-purple-pink-gradient text-xs">
              {message.sender.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
        <div className="flex-1">
          {!isCurrentUser && (
            <div className="font-medium text-xs text-white/70 mb-1">
              {message.sender}
            </div>
          )}
          <div className="text-white break-words">{message.text}</div>
          <div className="text-right text-xs text-white/70 mt-1">
            {formatTime(message.timestamp)}
          </div>
        </div>
        {isCurrentUser && (
          <Avatar className="h-8 w-8 border border-white/20 shadow-neon-sm">
            <AvatarImage src={`https://api.dicebear.com/7.x/personas/svg?seed=${message.sender}`} />
            <AvatarFallback className="bg-blue-purple-gradient text-xs">
              {message.sender.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
        )}
      </div>
    </div>
  );
};

export default ChatMessage;