import {CardValue, Utils} from "@package/core";
import type {Card} from "@package/core";
import type {Combination} from "./types";
import {PHEONIX, PheonixReplaceableCards} from "@package/core";
import {isValidCombination, determineCombination} from "./check-combination";

const {first, last, isSplittedGroupSame} = Utils;

// prettier-ignore
export const CalculateRank: {[K in Combination]: (cards: Card[]) => number} = {
  leaf: (cards) => first(cards.map((card) => CardValue[card]), 0),
  pair: (cards) => first(cards.map((card) => CardValue[card]), 0),
  triad:  (cards) => first(cards.map((card) => CardValue[card]), 0),
  full: (cards) => ((values) => isSplittedGroupSame(values, 3) ? first(values, 0) : last(values, 0))(cards.map((card) => CardValue[card]).sort()),
  straight: (cards) => last(cards.map((card) => CardValue[card]).sort(), 0),
  squareBombs: (cards) => first(cards.map((card) => CardValue[card]), 0) * 100,
  straightBombs: (cards) => last(cards.map((card) => CardValue[card]).sort(), 0) * 100,
};

export const activatePheonix = (cards: Card[]): Card[] => {
  if (cards.includes(PHEONIX) === false) {
    return cards;
  }

  const withoutPheonixCard = cards.filter((card) => card !== PHEONIX);
  const replaceableCards = PheonixReplaceableCards.filter((card) => cards.includes(card) === false);

  return last(
    replaceableCards
      .map((card) => [...withoutPheonixCard, card])
      .filter((cards) => isValidCombination(cards, true))
      .map((cards) => ({cards, combination: determineCombination(cards, true)}))
      .map(({cards, combination}) => ({cards, combination, rank: CalculateRank[combination](cards)}))
      .sort(({rank: a}, {rank: b}) => a - b)
      .map(({cards}) => cards),
    cards,
  );
};
