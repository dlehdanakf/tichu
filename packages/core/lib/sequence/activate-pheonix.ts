import {SpecialCard, PheonixReplaceableCards} from "@package/core";
import type {Card} from "@package/core";
import {isLengthAtLeast, last} from "@package/core/utils";
import {isValidSequence, determineSequence} from "./check-sequence";
import {calculateRank} from "./calculate-rank";

export const activatePheonix = (cards: Card[]): Card[] => {
  const withoutPheonixCard = cards.filter((card) => card !== SpecialCard.Pheonix);

  if (isLengthAtLeast(cards, 2) === false || cards.includes(SpecialCard.Pheonix) === false) {
    return cards;
  }

  return last(
    PheonixReplaceableCards.map((card) => [...withoutPheonixCard, card])
      .filter((cards) => isValidSequence(cards, true))
      .map((cards) => ({cards, rank: calculateRank(determineSequence(cards, true), cards)}))
      .sort(({rank: a}, {rank: b}) => a - b)
      .map(({cards}) => cards),
    cards,
  );
};
