import {CardValue, CardShape, _} from "@package/core";
import type {Card} from "@package/core";
import type {Combination} from "./types";

// prettier-ignore
export const CheckCombination: {[K in Combination]: (cards: Card[]) => boolean} = {
  leaf: (cards) => _.isLength(cards, 1),
  pair: (cards) => _.isLength(cards, 2) && _.isAllSame(cards.map((card) => CardValue[card])),
  triad: (cards) => _.isLength(cards, 3) && _.isAllSame(cards.map((card) => CardValue[card])),
  full: (cards) => _.isLength(cards, 5) && (_.isSplittedGroupSame(cards.map((card) => CardValue[card]).sort(), 3) || _.isSplittedGroupSame(cards.map((card) => CardValue[card]).sort(), 2)),
  straight: (cards) => _.isLengthAtLeast(cards, 5) && _.isIncreasing(cards.map((card) => CardValue[card]).sort()),
  squareBombs: (cards) => _.isLength(cards, 4) && _.isAllSame(cards.map((card) => CardValue[card])),
  straightBombs: (cards) => _.isLengthAtLeast(cards, 5) && _.isIncreasing(cards.map((card) => CardValue[card]).sort()) && _.isAllSame(cards.map((card) => CardShape[card])),
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
