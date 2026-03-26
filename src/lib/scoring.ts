/**
 * Official Skull King scoring rules.
 */

export function getMaxCardsForRound(round: number, playerCount: number): number {
  // With 8 players, rounds 8-10 are capped at 8 cards (deck has 70 cards)
  if (playerCount === 8 && round >= 8) return 8;
  return round;
}

export function calculateRoundScore(
  bid: number,
  tricks: number,
  bonus: number,
  cardsDealt: number
): number {
  let score = 0;

  if (bid === tricks) {
    if (bid === 0) {
      // Bid 0 and made it: +10 × cards dealt this round
      score = 10 * cardsDealt;
    } else {
      // Correct bid ≥1: 20 points × number of tricks
      score = 20 * tricks;
    }
    // Bonus points only count if prediction is correct
    score += bonus;
  } else {
    if (bid === 0) {
      // Bid 0 but took tricks: -10 × cards dealt this round
      score = -10 * cardsDealt;
    } else {
      // Incorrect bid: -10 × difference
      score = -10 * Math.abs(bid - tricks);
    }
    // No bonus if prediction is wrong
  }

  return score;
}
