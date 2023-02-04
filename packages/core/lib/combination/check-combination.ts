import {CardValue, CardShape, Utils} from "@package/core";
import type {Card} from "@package/core";
import type {Combination} from "./types";

const {isLength, isAllSame, isSplittedGroupSame, isLengthAtLeast, isIncreasing} = Utils;

// prettier-ignore
export const CheckCombination: {[K in Combination]: (cards: Card[]) => boolean} = {
  leaf: (cards) => isLength(cards, 1),
  pair: (cards) => isLength(cards, 2) && isAllSame(cards.map((card) => CardValue[card])),
  triad: (cards) => isLength(cards, 3) && isAllSame(cards.map((card) => CardValue[card])),
  full: (cards) => isLength(cards, 5) && (isSplittedGroupSame(cards.map((card) => CardValue[card]).sort(), 3) || isSplittedGroupSame(cards.map((card) => CardValue[card]).sort(), 2)),
  straight: (cards) => isLengthAtLeast(cards, 5) && isIncreasing(cards.map((card) => CardValue[card]).sort()),
  squareBombs: (cards) => isLength(cards, 4) && isAllSame(cards.map((card) => CardValue[card])),
  straightBombs: (cards) => isLengthAtLeast(cards, 5) && isIncreasing(cards.map((card) => CardValue[card]).sort()) && isAllSame(cards.map((card) => CardShape[card])),
};

export const isValidCombination = (cards: Card[], withoutBomb = false): boolean => {
  const bombCombinations: Combination[] = ["straightBombs", "squareBombs"];
  const normalCombinations: Combination[] = ["straight", "full", "triad", "pair", "leaf"];
  const combinations: Combination[] = withoutBomb ? normalCombinations : [...bombCombinations, ...normalCombinations];

  return combinations.map((key) => CheckCombination[key](cards)).some((result) => result === true);
};

export const determineCombination = (cards: Card[], withoutBomb = false): Combination => {
  const bombCombinations: Combination[] = ["straightBombs", "squareBombs"];
  const normalCombinations: Combination[] = ["straight", "full", "triad", "pair", "leaf"];
  const combinations: Combination[] = withoutBomb ? normalCombinations : [...bombCombinations, ...normalCombinations];

  const results = combinations.map((key) => CheckCombination[key](cards));
  const index = results.indexOf(true);

  return combinations[index];
};
