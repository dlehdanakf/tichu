import {SpecialCard, PheonixReplaceableCards} from "@package/core";
import type {Card} from "@package/core";
import {isLengthAtLeast, last} from "@package/core/utils";
import {isValidCombination, determineCombination} from "./check-combination";
import {calculateRank} from "./calculate-rank";

export const activatePheonix = (cards: Card[]): Card[] => {
  const withoutPheonixCard = cards.filter((card) => card !== SpecialCard.Pheonix);

  if (isLengthAtLeast(cards, 2) === false || cards.includes(SpecialCard.Pheonix) === false) {
    return cards;
  }

  return last(
    PheonixReplaceableCards.map((card) => [...withoutPheonixCard, card])
      .filter((cards) => isValidCombination(cards, true))
      .map((cards) => ({cards, combination: determineCombination(cards, true)}))
      .map(({cards, combination}) => ({cards, combination, rank: calculateRank(combination, cards)}))
      .sort(({rank: a}, {rank: b}) => a - b)
      .map(({cards}) => cards),
    cards,
  );
};
