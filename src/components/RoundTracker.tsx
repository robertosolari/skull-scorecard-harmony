
import React from 'react';
import { Button } from '@/components/ui/button';

interface RoundTrackerProps {
  currentRound: number;
  totalRounds: number;
  onStartGame: () => void;
  onNextRound: () => void;
  onFinishGame: () => void;
  onResetGame: () => void;
  gameStarted: boolean;
  gameCompleted: boolean;
  playersCount: number;
}

const RoundTracker: React.FC<RoundTrackerProps> = ({
  currentRound,
  totalRounds,
  onStartGame,
  onNextRound,
  onFinishGame,
  onResetGame,
  gameStarted,
  gameCompleted,
  playersCount
}) => {
  return (
    <div className="glass-card p-6 mb-6 animate-in delayed-300">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-medium mb-2 sm:mb-0">Game Progress</h2>
        
        {!gameStarted && !gameCompleted && playersCount >= 2 && (
          <Button 
            onClick={onStartGame}
            className="button-primary w-full sm:w-auto"
          >
            Start Game
          </Button>
        )}
        
        {gameStarted && !gameCompleted && currentRound < totalRounds && (
          <Button 
            onClick={onNextRound}
            className="button-primary w-full sm:w-auto"
          >
            Next Round
          </Button>
        )}
        
        {gameStarted && !gameCompleted && currentRound === totalRounds && (
          <Button 
            onClick={onFinishGame}
            className="button-primary w-full sm:w-auto"
          >
            Finish Game
          </Button>
        )}
        
        {gameCompleted && (
          <Button 
            onClick={onResetGame}
            className="button-primary w-full sm:w-auto"
          >
            New Game
          </Button>
        )}
      </div>
      
      {gameStarted && (
        <div className="w-full bg-skull-100 rounded-full h-2 mb-4">
          <div 
            className="bg-skull-500 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(currentRound / totalRounds) * 100}%` }}
          ></div>
        </div>
      )}
      
      <div className="flex justify-between items-center">
        <span className="text-muted-foreground text-sm">
          {gameStarted 
            ? `Round ${currentRound} of ${totalRounds}` 
            : gameCompleted 
              ? 'Game completed'
              : 'Add at least 2 players to start'}
        </span>
        
        {gameStarted && !gameCompleted && (
          <span className="tag">
            {currentRound === 1 ? 'First Round' : currentRound === totalRounds ? 'Final Round' : `Round ${currentRound}`}
          </span>
        )}
      </div>
    </div>
  );
};

export default RoundTracker;
