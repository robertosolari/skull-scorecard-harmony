
import React, { useState, useEffect } from 'react';
import { Player, RoundScore } from '@/types';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import AnimatedNumber from './AnimatedNumber';
import { Check } from 'lucide-react';
import { toast } from 'sonner';
import { useIsMobile } from '@/hooks/use-mobile';

interface ScoreTableProps {
  players: Player[];
  currentRound: number;
  updatePlayerScores: (playerId: string, bid: number, tricks: number, bonus: number) => void;
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
  const [bonuses, setBonuses] = useState<Record<string, string>>({});
  const [submittedPlayers, setSubmittedPlayers] = useState<Record<string, boolean>>({});
  const isMobile = useIsMobile();

  // Reset local state when round changes
  useEffect(() => {
    setBids({});
    setTricks({});
    setBonuses({});
    setSubmittedPlayers({});
  }, [currentRound]);

  // With 8 players, rounds 8-10 are capped at 8 cards
  const maxCards = players.length === 8 && currentRound >= 8 ? 8 : currentRound;

  const handleSubmitBids = () => {
    const allPlayersHaveBids = players.every(player => {
      const bidValue = bids[player.id];
      return bidValue !== undefined && bidValue !== '';
    });

    if (!allPlayersHaveBids) {
      toast.error("Inserisci le previsioni per tutti i giocatori");
      return;
    }

    setAllBidsEntered(true);
    toast.success("Previsioni registrate! Gioca il round e inserisci le prese");
  };

  const handleSubmitScore = (playerId: string) => {
    const bid = Number(bids[playerId]);
    const trick = Number(tricks[playerId]);
    const bonus = Number(bonuses[playerId] || 0);

    if (isNaN(bid) || bid < 0 || bid > maxCards) {
      toast.error(`La previsione deve essere tra 0 e ${maxCards}`);
      return;
    }

    if (isNaN(trick) || trick < 0 || trick > maxCards) {
      toast.error(`Le prese devono essere tra 0 e ${maxCards}`);
      return;
    }

    if (isNaN(bonus) || bonus < 0) {
      toast.error('Il bonus deve essere 0 o positivo');
      return;
    }

    updatePlayerScores(playerId, bid, trick, bonus);
    setSubmittedPlayers(prev => ({ ...prev, [playerId]: true }));
    toast.success(`Punteggio aggiornato per ${players.find(p => p.id === playerId)?.name}`);
  };

  const getLastRoundScore = (player: Player): RoundScore | undefined => {
    return player.scores.find(score => score.round === currentRound - 1);
  };

  const getRoundScore = (player: Player, round: number): number => {
    const roundScore = player.scores.find(score => score.round === round);
    return roundScore ? roundScore.score : 0;
  };

  const allPlayersSubmitted = players.every(player => submittedPlayers[player.id]);

  const renderPlayerCard = (player: Player) => {
    const lastRoundScore = getLastRoundScore(player);
    const isSubmitted = submittedPlayers[player.id];
    const currentRoundScore = getRoundScore(player, currentRound);

    return (
      <div key={player.id} className={`rounded-xl border p-4 space-y-3 ${isSubmitted ? 'bg-skull-50/50 border-skull-200' : 'bg-white border-skull-100'}`}>
        <div className="flex justify-between items-center">
          <span className="font-semibold text-lg">{player.name}</span>
          <span className="text-sm font-medium text-skull-600">
            Totale: <AnimatedNumber value={player.totalScore} className="font-bold" />
          </span>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {/* Previsione */}
          <div>
            <label className="text-xs font-medium text-skull-500 uppercase">Previsione</label>
            {!allBidsEntered ? (
              <Input
                type="number"
                min={0}
                max={maxCards}
                value={bids[player.id] || ''}
                onChange={(e) => setBids({ ...bids, [player.id]: e.target.value })}
                className="input-glass text-center mt-1 h-11"
              />
            ) : (
              <div className="mt-1 h-11 flex items-center justify-center bg-skull-100 rounded-md font-medium text-skull-700">
                {bids[player.id]}
              </div>
            )}
          </div>

          {/* Prese */}
          {allBidsEntered && (
            <div>
              <label className="text-xs font-medium text-skull-500 uppercase">Prese</label>
              {!isSubmitted ? (
                <Input
                  type="number"
                  min={0}
                  max={maxCards}
                  value={tricks[player.id] || ''}
                  onChange={(e) => setTricks({ ...tricks, [player.id]: e.target.value })}
                  className="input-glass text-center mt-1 h-11"
                />
              ) : (
                <div className="mt-1 h-11 flex items-center justify-center bg-skull-100 rounded-md font-medium text-skull-700">
                  {tricks[player.id]}
                </div>
              )}
            </div>
          )}

          {/* Bonus */}
          {allBidsEntered && (
            <div>
              <label className="text-xs font-medium text-skull-500 uppercase">Bonus</label>
              {!isSubmitted ? (
                <Input
                  type="number"
                  min={0}
                  value={bonuses[player.id] || ''}
                  onChange={(e) => setBonuses({ ...bonuses, [player.id]: e.target.value })}
                  className="input-glass text-center mt-1 h-11"
                  placeholder="0"
                />
              ) : (
                <div className="mt-1 h-11 flex items-center justify-center bg-amber-100 rounded-md font-medium text-amber-700">
                  {bonuses[player.id] || 0}
                </div>
              )}
            </div>
          )}

          {/* Punteggio Round */}
          {allBidsEntered && (
            <div>
              <label className="text-xs font-medium text-skull-500 uppercase">Punti Round</label>
              <div className="mt-1 h-11 flex items-center justify-center">
                {isSubmitted ? (
                  <AnimatedNumber
                    value={currentRoundScore}
                    className={`font-bold text-lg ${currentRoundScore > 0 ? 'text-green-600' : currentRoundScore < 0 ? 'text-red-600' : 'text-gray-600'}`}
                  />
                ) : lastRoundScore ? (
                  <span className="text-muted-foreground text-sm">
                    Prec: {lastRoundScore.score > 0 ? '+' : ''}{lastRoundScore.score}
                  </span>
                ) : (
                  <span className="text-muted-foreground">-</span>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Conferma button */}
        {allBidsEntered && !isSubmitted && (
          <Button
            onClick={() => handleSubmitScore(player.id)}
            className="w-full h-11 bg-green-500 hover:bg-green-600 text-white font-medium"
          >
            <Check className="h-5 w-5 mr-2" />
            Conferma
          </Button>
        )}
      </div>
    );
  };

  const renderDesktopTable = () => (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-skull-200">
            <th className="text-left py-3 px-4 font-medium">Giocatore</th>
            <th className="text-center py-3 px-4 font-medium">Previsione</th>
            {allBidsEntered && (
              <>
                <th className="text-center py-3 px-4 font-medium">Prese</th>
                <th className="text-center py-3 px-4 font-medium">Bonus</th>
              </>
            )}
            <th className="text-center py-3 px-4 font-medium">Punti Round</th>
            <th className="text-center py-3 px-4 font-medium">Totale</th>
            {allBidsEntered && !allPlayersSubmitted && (
              <th className="text-center py-3 px-4 font-medium"></th>
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
                      max={maxCards}
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
                  <>
                    <td className="py-3 px-4 text-center">
                      {!isSubmitted ? (
                        <Input
                          type="number"
                          min={0}
                          max={maxCards}
                          value={tricks[player.id] || ''}
                          onChange={(e) => setTricks({ ...tricks, [player.id]: e.target.value })}
                          className="input-glass text-center w-20 mx-auto"
                        />
                      ) : (
                        <span className="inline-block bg-skull-100 px-3 py-1 rounded-full font-medium text-skull-700">
                          {tricks[player.id]}
                        </span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-center">
                      {!isSubmitted ? (
                        <Input
                          type="number"
                          min={0}
                          value={bonuses[player.id] || ''}
                          onChange={(e) => setBonuses({ ...bonuses, [player.id]: e.target.value })}
                          className="input-glass text-center w-20 mx-auto"
                          placeholder="0"
                        />
                      ) : (
                        <span className="inline-block bg-amber-100 px-3 py-1 rounded-full font-medium text-amber-700">
                          {bonuses[player.id] || 0}
                        </span>
                      )}
                    </td>
                  </>
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
                      className="bg-green-500 hover:bg-green-600 text-white rounded-full h-10 w-10 p-0"
                    >
                      <Check className="h-5 w-5" />
                    </Button>
                  </td>
                )}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );

  return (
    <div className="glass-card p-4 sm:p-6 animate-in delayed-400">
      <div className="flex justify-between items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-medium">Round {currentRound}</h2>

        {!allBidsEntered && (
          <Button
            onClick={handleSubmitBids}
            className="button-primary h-11"
          >
            Conferma Previsioni
          </Button>
        )}
      </div>

      {isMobile ? (
        <div className="space-y-3">
          {players.map(renderPlayerCard)}
        </div>
      ) : (
        renderDesktopTable()
      )}
    </div>
  );
};

export default ScoreTable;
