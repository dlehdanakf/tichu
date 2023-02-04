import {CardValue, CardShape, _} from "@package/core";
import type {Card} from "@package/core";
import type {Combination} from "./types";

// prettier-ignore
const CheckCombination: {[K in Combination]: (cards: Card[]) => boolean} = {
  leaf: (cards) => _.isLength(cards, 1),
  pair: (cards) => _.isLength(cards, 2) && _.isAllSame(cards.map((card) => CardValue[card])),
  consecutivePairs: (cards) => _.isLength(cards, 4) && _.isAllSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b).slice(0, 2))&& _.isAllSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b).slice(2)) && _.isIncreasing(cards.map((card) => CardValue[card]).sort((a, b) => a - b).slice(1, 3)),
  triple: (cards) => _.isLength(cards, 3) && _.isAllSame(cards.map((card) => CardValue[card])),
  fullHouse: (cards) => _.isLength(cards, 5) && (_.isSplittedGroupSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 3) || _.isSplittedGroupSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 2)),
  straight: (cards) => _.isLengthAtLeast(cards, 5) && _.isIncreasing(cards.map((card) => CardValue[card]).sort((a, b) => a - b)),
  squareBomb: (cards) => _.isLength(cards, 4) && _.isAllSame(cards.map((card) => CardValue[card])),
  straightBomb: (cards) => _.isLengthAtLeast(cards, 5) && _.isIncreasing(cards.map((card) => CardValue[card]).sort((a, b) => a - b)) && _.isAllSame(cards.map((card) => CardShape[card])),
};

const BombCombinations: Combination[] = ["straightBomb", "squareBomb"];
const NormalCombinations: Combination[] = ["straight", "fullHouse", "triple", "consecutivePairs", "pair", "leaf"];

export const isValidCombination = (cards: Card[], withoutBomb = false): boolean => {
  const combinations: Combination[] = withoutBomb ? NormalCombinations : [...BombCombinations, ...NormalCombinations];

  return combinations.map((key) => CheckCombination[key](cards)).some((result) => result === true);
};

export const determineCombination = (cards: Card[], withoutBomb = false): Combination => {
  const combinations: Combination[] = withoutBomb ? NormalCombinations : [...BombCombinations, ...NormalCombinations];

  const results = combinations.map((key) => CheckCombination[key](cards));
  const index = results.indexOf(true);

  return combinations[index];
};
