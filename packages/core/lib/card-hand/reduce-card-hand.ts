import type {CardHand} from "./types";

export const reduceCardHand = ([firstHands, ...elseHands]: CardHand[]): CardHand => {
  return elseHands.reduce(
    (acc, cur) => ({
      cards: [...cur.cards],
      combination: acc.combination === cur.combination ? cur.combination : undefined,
      rank: Number.isNaN(cur.rank) ? acc.rank + 0.5 : cur.rank,
    }),
    {
      cards: [...firstHands.cards],
      combination: firstHands.combination,
      rank: Number.isNaN(firstHands.rank) ? 0.5 : firstHands.rank,
    },
  );
};
