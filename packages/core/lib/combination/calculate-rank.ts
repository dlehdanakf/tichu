import {CardValue} from "@package/core";
import type {Card} from "@package/core";
import {isSplittedGroupSame, first, last} from "@package/core/utils";
import type {Combination} from "./types";

// prettier-ignore
const Rank: {[K in Combination]: (cards: Card[]) => number} = {
  leaf: (cards) => first(cards.map((card) => CardValue[card]), 0),
  pair: (cards) => first(cards.map((card) => CardValue[card]), 0),
  consecutivePairs: (cards) => last(cards.map((card) => CardValue[card]), 0),
  triple:  (cards) => first(cards.map((card) => CardValue[card]), 0),
  fullHouse: (cards) => ((values) => isSplittedGroupSame(values, 3) ? first(values, 0) : last(values, 0))(cards.map((card) => CardValue[card]).sort((a, b) => a - b)),
  straight: (cards) => last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 0),
  squareBomb: (cards) => first(cards.map((card) => CardValue[card]), 0) * 100,
  straightBomb: (cards) => last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 0) * 100,
};

export const calculateRank = (combination: Combination, cards: Card[]): number => {
  return Rank[combination]?.(cards) ?? -Infinity;
};
