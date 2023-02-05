import type {CardHand} from "./types";

const accumulateCombination = (acc: CardHand["combination"], cur: CardHand["combination"]): CardHand["combination"] => {
  switch (true) {
    case cur === "squareBomb" || cur === "straightBomb":
      return cur;
    case acc === cur:
      return acc;
    default:
      return undefined;
  }
};

export const reduceCardHand = ([firstHands, ...elseHands]: CardHand[]): CardHand => {
  return elseHands.reduce(
    (acc, cur) => ({
      cards: [...cur.cards],
      combination: accumulateCombination(acc.combination, cur.combination),
      rank: Number.isNaN(cur.rank) ? acc.rank + 0.5 : cur.rank,
    }),
    {
      cards: [...firstHands.cards],
      combination: firstHands.combination,
      rank: Number.isNaN(firstHands.rank) ? 0.5 : firstHands.rank,
    },
  );
};
