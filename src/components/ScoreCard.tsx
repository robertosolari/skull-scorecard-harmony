
import React from 'react';
import { Player } from '@/types';
import AnimatedNumber from './AnimatedNumber';
import { Trophy } from 'lucide-react';

interface ScoreCardProps {
  players: Player[];
  gameCompleted: boolean;
}

const ScoreCard: React.FC<ScoreCardProps> = ({ players, gameCompleted }) => {
  // Sort players by total score (descending)
  const sortedPlayers = [...players].sort((a, b) => b.totalScore - a.totalScore);
  
  // Get the highest score
  const highestScore = sortedPlayers.length > 0 ? sortedPlayers[0].totalScore : 0;
  
  return (
    <div className="glass-card p-6 mb-6 animate-in delayed-300">
      <h2 className="text-xl font-medium mb-4">
        {gameCompleted ? 'Final Results' : 'Current Standings'}
      </h2>
      
      <div className="space-y-4">
        {sortedPlayers.map((player, index) => {
          const isWinner = gameCompleted && index === 0 && players.length > 1;
          const percentage = highestScore > 0 ? (player.totalScore / highestScore) * 100 : 0;
          
          return (
            <div 
              key={player.id}
              className={`relative bg-white rounded-xl p-4 shadow-sm border ${
                isWinner ? 'border-amber-300' : 'border-skull-100'
              } transition-all`}
            >
              <div className="flex justify-between items-center mb-1">
                <div className="flex items-center gap-3">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full ${
                    index === 0 ? 'bg-amber-100 text-amber-700' : 
                    index === 1 ? 'bg-gray-100 text-gray-700' : 
                    index === 2 ? 'bg-skull-100 text-skull-700' : 
                    'bg-muted text-muted-foreground'
                  }`}>
                    {index === 0 && players.length > 1 ? 
                      <Trophy className="h-4 w-4" /> : 
                      <span className="text-sm font-medium">{index + 1}</span>
                    }
                  </div>
                  
                  <h3 className="font-medium text-lg">{player.name}</h3>
                </div>
                
                <div className="text-right">
                  <AnimatedNumber 
                    value={player.totalScore} 
                    className={`text-lg font-semibold ${
                      index === 0 ? 'text-skull-700' : 'text-gray-700'
                    }`} 
                  />
                  <div className="text-xs text-muted-foreground">points</div>
                </div>
              </div>
              
              <div className="w-full bg-skull-100 rounded-full h-2 mt-2">
                <div 
                  className={`h-2 rounded-full transition-all duration-700 ease-out ${
                    index === 0 ? 'bg-skull-500' : 
                    index === 1 ? 'bg-skull-400' : 
                    'bg-skull-300'
                  }`}
                  style={{ width: `${Math.max(percentage, 5)}%` }}
                ></div>
              </div>
              
              {isWinner && (
                <div className="absolute -top-3 -right-3 bg-amber-400 text-white text-xs font-bold px-2 py-1 rounded-full">
                  Winner!
                </div>
              )}
            </div>
          );
        })}
        
        {players.length === 0 && (
          <div className="text-center text-muted-foreground p-4">
            No players added yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ScoreCard;
