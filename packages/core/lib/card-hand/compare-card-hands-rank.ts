import {isSameLength} from "@package/core/utils";
import type {Combination} from "@package/core";
import {reduceCardHand} from "./reduce-card-hand";
import type {CardHand} from "./types";

const BombCombinations: Combination[] = ["squareBomb", "straightBomb"];

const conditional = (condition: boolean, positive: boolean, negative: boolean) => {
  return condition ? positive : negative;
};

const isBombCombination = (combination: Combination | undefined) => {
  return BombCombinations.includes(combination as Combination);
};

const calibratePheonixRank = (nextRank: number, prevRank: number) => {
  return Number.isNaN(nextRank) ? prevRank + 0.5 : nextRank;
};

export const compareCardHandsRank = (previousCardHands: CardHand[], nextCardHand: CardHand) => {
  if (previousCardHands.length === 0) {
    return true;
  }

  const {cards: prevCards, combination: prevCombination, rank: prevRank} = reduceCardHand(previousCardHands);
  const {cards: nextCards, combination: nextCombination, rank: nextRank} = nextCardHand;

  return [
    // Both combination must be non-undefined value
    [nextCombination, prevCombination].every((combination) => combination !== undefined),

    // Unconditionally true if `nextCombination` is bomb,
    // otherwise it must be the same combination
    conditional(isBombCombination(nextCombination), true, nextCombination === prevCombination),

    // Unconditionally true if `nextCombination` is bomb,
    // otherwise it must have the same card count
    conditional(isBombCombination(nextCombination), true, isSameLength(nextCards, prevCards)),

    // `nextRank` must be bigger than `prevRank`
    conditional(
      isBombCombination(nextCombination),
      conditional(Number.isFinite(prevRank), nextRank > prevRank, true),
      calibratePheonixRank(nextRank, prevRank) > prevRank,
    ),
  ].every((result) => result === true);
};
