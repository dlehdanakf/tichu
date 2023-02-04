import {CardValue, _} from "@package/core";
import type {Card} from "@package/core";
import type {Combination} from "./types";

// prettier-ignore
const Rank: {[K in Combination]: (cards: Card[]) => number} = {
  leaf: (cards) => _.first(cards.map((card) => CardValue[card]), 0),
  pair: (cards) => _.first(cards.map((card) => CardValue[card]), 0),
  consecutivePairs: (cards) => _.last(cards.map((card) => CardValue[card]), 0),
  triple:  (cards) => _.first(cards.map((card) => CardValue[card]), 0),
  fullHouse: (cards) => ((values) => _.isSplittedGroupSame(values, 3) ? _.first(values, 0) : _.last(values, 0))(cards.map((card) => CardValue[card]).sort((a, b) => a - b)),
  straight: (cards) => _.last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 0),
  squareBomb: (cards) => _.first(cards.map((card) => CardValue[card]), 0) * 100,
  straightBomb: (cards) => _.last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 0) * 100,
};

export const calculateRank = (combination: Combination, cards: Card[]): number => {
  return Rank[combination](cards);
};
