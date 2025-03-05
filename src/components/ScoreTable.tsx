
import React, { useState } from 'react';
import { Player, RoundScore } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AnimatedNumber from './AnimatedNumber';
import { Check } from 'lucide-react';
import { toast } from 'sonner';

interface ScoreTableProps {
  players: Player[];
  currentRound: number;
  updatePlayerScores: (playerId: string, bid: number, tricks: number) => void;
  allBidsEntered: boolean;
  setAllBidsEntered: (value: boolean) => void;
}

const ScoreTable: React.FC<ScoreTableProps> = ({
  players,
  currentRound,
  updatePlayerScores,
  allBidsEntered,
  setAllBidsEntered
}) => {
  const [bids, setBids] = useState<Record<string, string>>({});
  const [tricks, setTricks] = useState<Record<string, string>>({});
  const [submittedPlayers, setSubmittedPlayers] = useState<Record<string, boolean>>({});

  const handleSubmitBids = () => {
    const allPlayersHaveBids = players.every(player => {
      const bidValue = bids[player.id];
      return bidValue !== undefined && bidValue !== '';
    });

    if (!allPlayersHaveBids) {
      toast.error("Please enter bids for all players");
      return;
    }

    setAllBidsEntered(true);
    toast.success("All bids recorded! Play the round and then enter tricks won");
  };

  const handleSubmitScore = (playerId: string) => {
    const bid = Number(bids[playerId]);
    const trick = Number(tricks[playerId]);

    if (isNaN(bid) || bid < 0 || bid > currentRound) {
      toast.error(`Bid must be between 0 and ${currentRound}`);
      return;
    }

    if (isNaN(trick) || trick < 0 || trick > currentRound) {
      toast.error(`Tricks must be between 0 and ${currentRound}`);
      return;
    }

    updatePlayerScores(playerId, bid, trick);
    setSubmittedPlayers(prev => ({ ...prev, [playerId]: true }));
    toast.success(`Score updated for ${players.find(p => p.id === playerId)?.name}`);
  };

  const getLastRoundScore = (player: Player): RoundScore | undefined => {
    return player.scores.find(score => score.round === currentRound - 1);
  };

  const getRoundScore = (player: Player, round: number): number => {
    const roundScore = player.scores.find(score => score.round === round);
    return roundScore ? roundScore.score : 0;
  };

  const allPlayersSubmitted = players.every(player => submittedPlayers[player.id]);

  return (
    <div className="glass-card p-6 animate-in delayed-400">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-medium">Round {currentRound} Scores</h2>
        
        {!allBidsEntered && (
          <Button 
            onClick={handleSubmitBids}
            className="button-primary"
          >
            Confirm Bids
          </Button>
        )}
      </div>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-skull-200">
              <th className="text-left py-3 px-4 font-medium">Player</th>
              <th className="text-center py-3 px-4 font-medium">Bid</th>
              {allBidsEntered && (
                <th className="text-center py-3 px-4 font-medium">Tricks</th>
              )}
              <th className="text-center py-3 px-4 font-medium">Round Score</th>
              <th className="text-center py-3 px-4 font-medium">Total Score</th>
              {allBidsEntered && !allPlayersSubmitted && (
                <th className="text-center py-3 px-4 font-medium">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {players.map((player) => {
              const lastRoundScore = getLastRoundScore(player);
              const isSubmitted = submittedPlayers[player.id];
              const currentRoundScore = getRoundScore(player, currentRound);
              
              return (
                <tr key={player.id} className="border-b border-skull-100 hover:bg-skull-50/50">
                  <td className="py-4 px-4 font-medium">{player.name}</td>
                  <td className="py-3 px-4 text-center">
                    {!allBidsEntered ? (
                      <Input
                        type="number"
                        min={0}
                        max={currentRound}
                        value={bids[player.id] || ''}
                        onChange={(e) => setBids({ ...bids, [player.id]: e.target.value })}
                        className="input-glass text-center w-20 mx-auto"
                      />
                    ) : (
                      <span className="inline-block bg-skull-100 px-3 py-1 rounded-full font-medium text-skull-700">
                        {bids[player.id]}
                      </span>
                    )}
                  </td>
                  
                  {allBidsEntered && (
                    <td className="py-3 px-4 text-center">
                      {!isSubmitted ? (
                        <Input
                          type="number"
                          min={0}
                          max={currentRound}
                          value={tricks[player.id] || ''}
                          onChange={(e) => setTricks({ ...tricks, [player.id]: e.target.value })}
                          className="input-glass text-center w-20 mx-auto"
                          disabled={isSubmitted}
                        />
                      ) : (
                        <span className="inline-block bg-skull-100 px-3 py-1 rounded-full font-medium text-skull-700">
                          {tricks[player.id]}
                        </span>
                      )}
                    </td>
                  )}
                  
                  <td className="py-3 px-4 text-center">
                    {isSubmitted ? (
                      <AnimatedNumber 
                        value={currentRoundScore} 
                        className={`font-medium ${currentRoundScore > 0 ? 'text-green-600' : currentRoundScore < 0 ? 'text-red-600' : 'text-gray-600'}`}
                      />
                    ) : lastRoundScore ? (
                      <span className="text-muted-foreground">
                        {lastRoundScore.score > 0 ? '+' : ''}{lastRoundScore.score}
                      </span>
                    ) : (
                      <span className="text-muted-foreground">-</span>
                    )}
                  </td>
                  
                  <td className="py-3 px-4 text-center">
                    <AnimatedNumber value={player.totalScore} className="font-semibold" />
                  </td>
                  
                  {allBidsEntered && !isSubmitted && (
                    <td className="py-3 px-4 text-center">
                      <Button
                        onClick={() => handleSubmitScore(player.id)}
                        className="bg-green-500 hover:bg-green-600 text-white rounded-full h-8 w-8 p-0"
                      >
                        <Check className="h-4 w-4" />
                      </Button>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;
