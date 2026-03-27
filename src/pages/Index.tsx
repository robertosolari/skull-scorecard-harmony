
import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'sonner';
import { GameState, Player } from '@/types';
import { getMaxCardsForRound, calculateRoundScore } from '@/lib/scoring';
import Header from '@/components/Header';
import InfoModal from '@/components/InfoModal';
import AddPlayerForm from '@/components/AddPlayerForm';
import PlayerList from '@/components/PlayerList';
import RoundTracker from '@/components/RoundTracker';
import ScoreTable from '@/components/ScoreTable';
import ScoreCard from '@/components/ScoreCard';
import Footer from '@/components/Footer';

const Index = () => {
  const [infoModalOpen, setInfoModalOpen] = useState(false);
  const [gameState, setGameState] = useState<GameState>({
    players: [],
    currentRound: 1,
    totalRounds: 10,
    gameStarted: false,
    gameCompleted: false
  });
  const [allBidsEntered, setAllBidsEntered] = useState(false);

  // Save game state to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('skullKingGameState', JSON.stringify(gameState));
  }, [gameState]);

  // Load game state from localStorage when component mounts
  useEffect(() => {
    const savedState = localStorage.getItem('skullKingGameState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        setGameState(parsedState);
        if (parsedState.gameStarted && !parsedState.gameCompleted) {
          setAllBidsEntered(true);
        }
      } catch (error) {
        console.error('Error parsing saved game state:', error);
      }
    }
  }, []);

  const handleAddPlayer = (name: string) => {
    if (gameState.players.some(player => player.name.toLowerCase() === name.toLowerCase())) {
      toast.error('A player with that name already exists');
      return;
    }
    
    if (gameState.players.length >= 8) {
      toast.error('Maximum 8 players allowed');
      return;
    }
    
    const newPlayer: Player = {
      id: uuidv4(),
      name,
      scores: [],
      totalScore: 0
    };
    
    setGameState(prev => ({
      ...prev,
      players: [...prev.players, newPlayer]
    }));
    
    toast.success(`${name} added to the game`);
  };

  const handleRemovePlayer = (id: string) => {
    setGameState(prev => ({
      ...prev,
      players: prev.players.filter(player => player.id !== id)
    }));
  };

  const handleStartGame = () => {
    if (gameState.players.length < 2) {
      toast.error('You need at least 2 players to start a game');
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      gameStarted: true
    }));
    
    toast.success('Game started!');
  };

  const handleNextRound = () => {
    if (!allBidsEntered) {
      toast.error('Please enter and confirm bids for all players first');
      return;
    }
    
    const allPlayersHaveScores = gameState.players.every(player => 
      player.scores.some(score => score.round === gameState.currentRound)
    );
    
    if (!allPlayersHaveScores) {
      toast.error('Please enter tricks won for all players');
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      currentRound: prev.currentRound + 1
    }));
    
    setAllBidsEntered(false);
    
    toast.success(`Starting round ${gameState.currentRound + 1}`);
  };

  const handleFinishGame = () => {
    const allPlayersHaveScores = gameState.players.every(player => 
      player.scores.some(score => score.round === gameState.currentRound)
    );
    
    if (!allPlayersHaveScores) {
      toast.error('Please enter tricks won for all players');
      return;
    }
    
    setGameState(prev => ({
      ...prev,
      gameCompleted: true
    }));
    
    toast.success('Game completed!');
  };

  const handleResetGame = () => {
    setGameState({
      players: [],
      currentRound: 1,
      totalRounds: 10,
      gameStarted: false,
      gameCompleted: false
    });
    
    setAllBidsEntered(false);
    
    toast.success('New game started');
  };

  const updatePlayerScores = (playerId: string, bid: number, tricks: number, bonus: number) => {
    setGameState(prev => {
      const cardsDealt = getMaxCardsForRound(prev.currentRound, prev.players.length);
      const updatedPlayers = prev.players.map(player => {
        if (player.id !== playerId) return player;

        const roundScore = calculateRoundScore(bid, tricks, bonus, cardsDealt);

        const newScores = [
          ...player.scores.filter(score => score.round !== prev.currentRound),
          { round: prev.currentRound, bid, tricks, bonus, score: roundScore }
        ];

        const totalScore = newScores.reduce((sum, score) => sum + score.score, 0);

        return {
          ...player,
          scores: newScores,
          totalScore
        };
      });

      return {
        ...prev,
        players: updatedPlayers
      };
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-skull-50 to-white">
      <Header openInfoModal={() => setInfoModalOpen(true)} />
      
      <InfoModal 
        isOpen={infoModalOpen} 
        onClose={() => setInfoModalOpen(false)} 
      />
      
      <div className="container max-w-7xl mx-auto px-4 py-6">
        <AddPlayerForm 
          onAddPlayer={handleAddPlayer} 
          isGameStarted={gameState.gameStarted} 
        />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {gameState.gameStarted && !gameState.gameCompleted && (
              <ScoreTable 
                players={gameState.players}
                currentRound={gameState.currentRound}
                updatePlayerScores={updatePlayerScores}
                allBidsEntered={allBidsEntered}
                setAllBidsEntered={setAllBidsEntered}
              />
            )}
          </div>
          
          <div className="space-y-6">
            <PlayerList 
              players={gameState.players}
              onRemovePlayer={handleRemovePlayer}
              isGameStarted={gameState.gameStarted}
            />
            
            <RoundTracker 
              currentRound={gameState.currentRound}
              totalRounds={gameState.totalRounds}
              onStartGame={handleStartGame}
              onNextRound={handleNextRound}
              onFinishGame={handleFinishGame}
              onResetGame={handleResetGame}
              gameStarted={gameState.gameStarted}
              gameCompleted={gameState.gameCompleted}
              playersCount={gameState.players.length}
            />
            
            {(gameState.gameStarted || gameState.gameCompleted) && (
              <ScoreCard 
                players={gameState.players} 
                gameCompleted={gameState.gameCompleted} 
              />
            )}
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Index;
