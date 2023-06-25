import {CardValue} from "@package/core";
import type {Card} from "@package/core";
import {isSplittedGroupSame, first, last} from "@package/core/utils";
import type {Sequence} from "./types";

// prettier-ignore
const Rank: {[K in Sequence | 'undefined']: (cards: Card[]) => number} = {
  undefined: () => -Infinity,
  leaf: (cards) => first(cards.map((card) => CardValue[card]), -Infinity),
  pair: (cards) => first(cards.map((card) => CardValue[card]), -Infinity),
  consecutivePairs: (cards) => last(cards.map((card) => CardValue[card]), -Infinity),
  triple:  (cards) => first(cards.map((card) => CardValue[card]), -Infinity),
  fullHouse: (cards) => ((values) => isSplittedGroupSame(values, 3) ? first(values, -Infinity) : last(values, -Infinity))(cards.map((card) => CardValue[card]).sort((a, b) => a - b)),
  straight: (cards) => last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), -Infinity),
  squareBomb: (cards) => first(cards.map((card) => CardValue[card]), -Infinity) * 100,
  straightBomb: (cards) => last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), -Infinity) * 10000,
};

export const calculateRank = (sequence: Sequence | undefined, cards: Card[]): number => {
  return Rank[sequence ?? "undefined"](cards);
};
