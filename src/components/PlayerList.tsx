
import React from 'react';
import { Player } from '@/types';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import AnimatedNumber from './AnimatedNumber';
import { useTranslation } from 'react-i18next';

interface PlayerListProps {
  players: Player[];
  onRemovePlayer: (id: string) => void;
  isGameStarted: boolean;
}

const PlayerList: React.FC<PlayerListProps> = ({ players, onRemovePlayer, isGameStarted }) => {
  const { t } = useTranslation();

  if (players.length === 0) {
    return (
      <div className="glass-card p-6 text-center animate-in delayed-200">
        <p className="text-muted-foreground">{t('playerList.noPlayers')}</p>
      </div>
    );
  }

  return (
    <div className="glass-card p-6 mb-6 animate-in delayed-200">
      <h2 className="text-xl font-medium mb-4">{t('playerList.title')}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {players.map((player) => (
          <div
            key={player.id}
            className="relative bg-white rounded-xl p-4 shadow-sm border border-skull-100 flex items-center justify-between card-hover"
          >
            <div>
              <h3 className="font-medium text-gray-900">{player.name}</h3>
              {isGameStarted && (
                <p className="text-sm text-muted-foreground">
                  {t('playerList.score')} <AnimatedNumber value={player.totalScore} className="font-semibold text-skull-700" />
                </p>
              )}
            </div>

            {!isGameStarted && (
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onRemovePlayer(player.id)}
                className="h-8 w-8 rounded-full hover:bg-red-50 hover:text-red-500"
              >
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PlayerList;
