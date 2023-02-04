import {CardValue, CardShape} from "@package/core";
import type {Card} from "@package/core";
import {isLength, isLengthAtLeast, isAllSame, isSplittedGroupSame, isIncreasing} from "@package/core/utils";
import type {Combination} from "./types";

// prettier-ignore
const CheckCombination: {[K in Combination]: (cards: Card[]) => boolean} = {
  leaf: (cards) => isLength(cards, 1),
  pair: (cards) => isLength(cards, 2) && isAllSame(cards.map((card) => CardValue[card])),
  consecutivePairs: (cards) => isLength(cards, 4) && isAllSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b).slice(0, 2))&& isAllSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b).slice(2)) && isIncreasing(cards.map((card) => CardValue[card]).sort((a, b) => a - b).slice(1, 3)),
  triple: (cards) => isLength(cards, 3) && isAllSame(cards.map((card) => CardValue[card])),
  fullHouse: (cards) => isLength(cards, 5) && (isSplittedGroupSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 3) || isSplittedGroupSame(cards.map((card) => CardValue[card]).sort((a, b) => a - b), 2)),
  straight: (cards) => isLengthAtLeast(cards, 5) && isIncreasing(cards.map((card) => CardValue[card]).sort((a, b) => a - b)),
  squareBomb: (cards) => isLength(cards, 4) && isAllSame(cards.map((card) => CardValue[card])),
  straightBomb: (cards) => isLengthAtLeast(cards, 5) && isIncreasing(cards.map((card) => CardValue[card]).sort((a, b) => a - b)) && isAllSame(cards.map((card) => CardShape[card])),
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
