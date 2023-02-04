import {CardValue, _} from "@package/core";
import type {Card} from "@package/core";
import type {Combination} from "./types";
import {SpecialCard, PheonixReplaceableCards} from "@package/core";
import {isValidCombination, determineCombination} from "./check-combination";

// prettier-ignore
export const CalculateRank: {[K in Combination]: (cards: Card[]) => number} = {
  leaf: (cards) => _.first(cards.map((card) => CardValue[card]), 0),
  pair: (cards) => _.first(cards.map((card) => CardValue[card]), 0),
  triad:  (cards) => _.first(cards.map((card) => CardValue[card]), 0),
  full: (cards) => ((values) => _.isSplittedGroupSame(values, 3) ? _.first(values, 0) : _.last(values, 0))(cards.map((card) => CardValue[card]).sort()),
  straight: (cards) => _.last(cards.map((card) => CardValue[card]).sort(), 0),
  squareBombs: (cards) => _.first(cards.map((card) => CardValue[card]), 0) * 100,
  straightBombs: (cards) => _.last(cards.map((card) => CardValue[card]).sort(), 0) * 100,
};

export const activatePheonix = (cards: Card[]): Card[] => {
  if (cards.includes(SpecialCard.Pheonix) === false) {
    return cards;
  }

  const withoutPheonixCard = cards.filter((card) => card !== SpecialCard.Pheonix);
  const replaceableCards = PheonixReplaceableCards.filter((card) => cards.includes(card) === false);

  return _.last(
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
