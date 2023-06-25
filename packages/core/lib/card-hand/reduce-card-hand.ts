import type {CardHand} from "./types";

const accumulateSequence = (acc: CardHand["sequence"], cur: CardHand["sequence"]): CardHand["sequence"] => {
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
      sequence: accumulateSequence(acc.sequence, cur.sequence),
      rank: Number.isNaN(cur.rank) ? acc.rank + 0.5 : cur.rank,
    }),
    {
      cards: [...firstHands.cards],
      sequence: firstHands.sequence,
      rank: Number.isNaN(firstHands.rank) ? 0.5 : firstHands.rank,
    },
  );
};
