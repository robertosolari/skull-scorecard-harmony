
export interface Player {
  id: string;
  name: string;
  scores: RoundScore[];
  totalScore: number;
}

export interface RoundScore {
  round: number;
  bid: number;
  tricks: number;
  bonus: number;
  score: number;
}

export interface GameState {
  players: Player[];
  currentRound: number;
  totalRounds: number;
  gameStarted: boolean;
  gameCompleted: boolean;
}
