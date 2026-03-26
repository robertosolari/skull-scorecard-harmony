import { describe, it, expect } from 'vitest';
import { calculateRoundScore, getMaxCardsForRound } from './scoring';

describe('getMaxCardsForRound', () => {
  it('returns round number for fewer than 8 players', () => {
    expect(getMaxCardsForRound(10, 4)).toBe(10);
    expect(getMaxCardsForRound(8, 7)).toBe(8);
    expect(getMaxCardsForRound(1, 2)).toBe(1);
  });

  it('caps at 8 cards for 8 players in rounds 8-10', () => {
    expect(getMaxCardsForRound(8, 8)).toBe(8);
    expect(getMaxCardsForRound(9, 8)).toBe(8);
    expect(getMaxCardsForRound(10, 8)).toBe(8);
  });

  it('does not cap for 8 players in rounds before 8', () => {
    expect(getMaxCardsForRound(7, 8)).toBe(7);
    expect(getMaxCardsForRound(1, 8)).toBe(1);
  });
});

describe('calculateRoundScore', () => {
  describe('bid >= 1, correct prediction', () => {
    it('scores 20 points per trick (example from rules: bid 3, got 3 = 60)', () => {
      // Maria Chiara ha puntato 3 e fatto 3 prese = 60 punti (20 × 3)
      expect(calculateRoundScore(3, 3, 0, 5)).toBe(60);
    });

    it('scores 20 points per trick regardless of round', () => {
      // Round 1: bid 1, got 1 = 20
      expect(calculateRoundScore(1, 1, 0, 1)).toBe(20);
      // Round 10: bid 5, got 5 = 100
      expect(calculateRoundScore(5, 5, 0, 10)).toBe(100);
    });

    it('includes bonus when prediction is correct', () => {
      // Bid 2, got 2 = 40 + 30 bonus = 70
      expect(calculateRoundScore(2, 2, 30, 5)).toBe(70);
    });
  });

  describe('bid >= 1, incorrect prediction', () => {
    it('loses 10 per difference (example: bid 2, got 4 = -20)', () => {
      // Gabriele ha puntato 2, fatto 4 prese, differenza 2 = -20 (-10 × 2)
      expect(calculateRoundScore(2, 4, 0, 5)).toBe(-20);
    });

    it('loses 10 per difference when under', () => {
      // Bid 5, got 2, diff 3 = -30
      expect(calculateRoundScore(5, 2, 0, 7)).toBe(-30);
    });

    it('ignores bonus when prediction is wrong', () => {
      // Even with bonus 40, wrong prediction = no bonus
      expect(calculateRoundScore(3, 5, 40, 7)).toBe(-20);
    });
  });

  describe('bid = 0, correct (no tricks taken)', () => {
    it('gains 10 per card dealt (example: round 7 = 70)', () => {
      // Giacomo punta 0 nel 7° giro, 0 prese = 70 (10 × 7)
      expect(calculateRoundScore(0, 0, 0, 7)).toBe(70);
    });

    it('works for round 1', () => {
      expect(calculateRoundScore(0, 0, 0, 1)).toBe(10);
    });

    it('works for round 10', () => {
      expect(calculateRoundScore(0, 0, 0, 10)).toBe(100);
    });

    it('includes bonus when bid 0 is correct', () => {
      expect(calculateRoundScore(0, 0, 20, 5)).toBe(70);
    });
  });

  describe('bid = 0, failed (took tricks)', () => {
    it('loses 10 per card dealt (example: round 9, took 2 = -90)', () => {
      // Silvia punta 0 nel 9° giro, fa 2 prese = -90 (-10 × 9)
      expect(calculateRoundScore(0, 2, 0, 9)).toBe(-90);
    });

    it('same penalty regardless of how many tricks taken', () => {
      // Round 5: bid 0, got 1 trick = -50
      expect(calculateRoundScore(0, 1, 0, 5)).toBe(-50);
      // Round 5: bid 0, got 5 tricks = still -50
      expect(calculateRoundScore(0, 5, 0, 5)).toBe(-50);
    });

    it('ignores bonus when bid 0 fails', () => {
      expect(calculateRoundScore(0, 3, 40, 8)).toBe(-80);
    });
  });

  describe('bonus points from rules', () => {
    it('Skull King captured by Mermaid = +40', () => {
      // Correct prediction + SK captured
      expect(calculateRoundScore(2, 2, 40, 5)).toBe(80);
    });

    it('Pirate captured by Skull King = +30', () => {
      expect(calculateRoundScore(1, 1, 30, 3)).toBe(50);
    });

    it('Mermaid captured by Pirate = +20', () => {
      expect(calculateRoundScore(3, 3, 20, 5)).toBe(80);
    });

    it('Normal 14 card = +10, Black 14 = +20', () => {
      // Two normal 14s + one black 14 = 10+10+20 = 40 bonus
      expect(calculateRoundScore(4, 4, 40, 7)).toBe(120);
    });

    it('complex example from rules: Cristina gets 14 yellow (+10) + SK capture (+40)', () => {
      // If she bid correctly, e.g. bid 1, got 1 = 20 + 50 bonus = 70
      expect(calculateRoundScore(1, 1, 50, 5)).toBe(70);
    });
  });
});
