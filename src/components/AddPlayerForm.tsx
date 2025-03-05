
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface AddPlayerFormProps {
  onAddPlayer: (name: string) => void;
  isGameStarted: boolean;
}

const AddPlayerForm: React.FC<AddPlayerFormProps> = ({ onAddPlayer, isGameStarted }) => {
  const [playerName, setPlayerName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!playerName.trim()) {
      toast.error('Please enter a player name');
      return;
    }
    
    if (playerName.length > 15) {
      toast.error('Player name must be less than 15 characters');
      return;
    }
    
    onAddPlayer(playerName.trim());
    setPlayerName('');
  };

  if (isGameStarted) {
    return null;
  }

  return (
    <div className="glass-card p-6 mb-6 animate-in delayed-100">
      <h2 className="text-xl font-medium mb-4">Add Players</h2>
      <form onSubmit={handleSubmit} className="flex items-center gap-3">
        <Input
          type="text"
          placeholder="Enter player name"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          className="input-glass flex-1"
          maxLength={15}
        />
        <Button 
          type="submit" 
          className="button-primary flex items-center gap-2"
        >
          <Plus className="h-4 w-4" />
          <span>Add</span>
        </Button>
      </form>
    </div>
  );
};

export default AddPlayerForm;
