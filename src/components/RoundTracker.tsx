
import React from 'react';
import { Button } from '@/components/ui/button';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation();

  return (
    <div className="glass-card p-6 mb-6 animate-in delayed-300">
      <div className="flex flex-col sm:flex-row justify-between items-center mb-4">
        <h2 className="text-xl font-medium mb-2 sm:mb-0">{t('roundTracker.title')}</h2>

        {!gameStarted && !gameCompleted && playersCount >= 2 && (
          <Button
            onClick={onStartGame}
            className="button-primary w-full sm:w-auto"
          >
            {t('roundTracker.startGame')}
          </Button>
        )}

        {gameStarted && !gameCompleted && currentRound < totalRounds && (
          <Button
            onClick={onNextRound}
            className="button-primary w-full sm:w-auto"
          >
            {t('roundTracker.nextRound')}
          </Button>
        )}

        {gameStarted && !gameCompleted && currentRound === totalRounds && (
          <Button
            onClick={onFinishGame}
            className="button-primary w-full sm:w-auto"
          >
            {t('roundTracker.finishGame')}
          </Button>
        )}

        {gameCompleted && (
          <Button
            onClick={onResetGame}
            className="button-primary w-full sm:w-auto"
          >
            {t('roundTracker.newGame')}
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
            ? t('roundTracker.roundOf', { current: currentRound, total: totalRounds })
            : gameCompleted
              ? t('roundTracker.gameCompleted')
              : t('roundTracker.addPlayers')}
        </span>

        {gameStarted && !gameCompleted && (
          <span className="tag">
            {currentRound === 1 ? t('roundTracker.firstRound') : currentRound === totalRounds ? t('roundTracker.finalRound') : t('roundTracker.round', { current: currentRound })}
          </span>
        )}
      </div>
    </div>
  );
};

export default RoundTracker;
