import React from 'react';
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
import { useChatSessions } from '@/context/ChatSessionsContext';

interface NewChatDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const NewChatDialog: React.FC<NewChatDialogProps> = ({ open, onOpenChange }) => {
  const { createNewChatSession } = useChatSessions();

  const handleCreateNewSession = () => {
    createNewChatSession();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
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
            onClick={handleCreateNewSession}
            className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
          >
            Start New Session
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export const NewChatButton: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  return (
    <Button 
      onClick={onClick}
      className="bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600 text-white shadow-neon-sm hover:shadow-neon-md transition-all duration-300"
    >
      <PlusCircle className="w-5 h-5 mr-2" />
      New Chat Session
    </Button>
  );
};

export default NewChatDialog;
