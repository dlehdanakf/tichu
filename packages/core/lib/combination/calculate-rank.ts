import {CardValue} from "@package/core";
import type {Card} from "@package/core";
import {isSplittedGroupSame, first, last} from "@package/core/utils";
import type {Combination} from "./types";

// prettier-ignore
const Rank: {[K in Combination | 'undefined']: (cards: Card[]) => number} = {
  undefined: () => -Infinity,
  leaf: (cards) => first(cards.map((card) => CardValue[card]), -Infinity),
  pair: (cards) => first(cards.map((card) => CardValue[card]), -Infinity),
  consecutivePairs: (cards) => last(cards.map((card) => CardValue[card]), -Infinity),
  triple:  (cards) => first(cards.map((card) => CardValue[card]), -Infinity),
  fullHouse: (cards) => ((values) => isSplittedGroupSame(values, 3) ? first(values, -Infinity) : last(values, -Infinity))(cards.map((card) => CardValue[card]).sort((a, b) => a - b)),
  straight: (cards) => last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), -Infinity),
  squareBomb: (cards) => first(cards.map((card) => CardValue[card]), -Infinity) * 100,
  straightBomb: (cards) => last(cards.map((card) => CardValue[card]).sort((a, b) => a - b), -Infinity) * 100,
};

export const calculateRank = (combination: Combination | undefined, cards: Card[]): number => {
  return Rank[combination ?? "undefined"](cards);
};
