import {CardValue, CardShape} from "@package/core";
import type {Card} from "@package/core";
import {chunk, uniq} from "lodash-es";
import {isLength, isLengthAtLeast, isAllSame, isSplittedGroupSame, isIncreasing} from "@package/core/utils";
import type {Combination} from "./types";
import {Combinations, NormalCombinations} from "./variables";

const toCardValues = (cards: Card[]) => cards.map((card) => CardValue[card]).sort((a, b) => a - b);

// prettier-ignore
const CheckCombination: {[K in Combination]: (cards: Card[]) => boolean} = {
  leaf: (cards) => isLength(cards, 1),
  pair: (cards) => isLength(cards, 2) && isAllSame(cards.map((card) => CardValue[card])),
  consecutivePairs: (cards) => chunk(toCardValues(cards), 2).every((chunkedCards) => isLength(chunkedCards, 2) && isAllSame(chunkedCards)) && isIncreasing(uniq(toCardValues(cards))),
  triple: (cards) => isLength(cards, 3) && isAllSame(cards.map((card) => CardValue[card])),
  fullHouse: (cards) => isLength(cards, 5) && (isSplittedGroupSame(toCardValues(cards), 3) || isSplittedGroupSame(toCardValues(cards), 2)),
  straight: (cards) => isLengthAtLeast(cards, 5) && isIncreasing(toCardValues(cards)),
  squareBomb: (cards) => isLength(cards, 4) && isAllSame(cards.map((card) => CardValue[card])),
  straightBomb: (cards) => isLengthAtLeast(cards, 5) && isIncreasing(toCardValues(cards)) && isAllSame(cards.map((card) => CardShape[card])),
};

export const isValidCombination = (cards: Card[], withoutBomb = false): boolean => {
  const combinations: Combination[] = withoutBomb ? NormalCombinations : Combinations;

  return combinations.map((key) => CheckCombination[key](cards)).some((result) => result === true);
};

export const determineCombination = (cards: Card[], withoutBomb = false): Combination | undefined => {
  const combinations: Combination[] = withoutBomb ? NormalCombinations : Combinations;

  const results = combinations.map((key) => CheckCombination[key](cards));
  const index = results.indexOf(true);

  return combinations[index];
};
