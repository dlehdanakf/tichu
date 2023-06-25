import {isSameLength} from "@package/core/utils";
import {BombSequences} from "@package/core";
import type {Sequence} from "@package/core";
import {reduceCardHand} from "./reduce-card-hand";
import type {CardHand} from "./types";

const conditional = (condition: boolean, positive: boolean, negative: boolean) => {
  return condition ? positive : negative;
};

const isBombSequence = (sequence: Sequence | undefined) => {
  return BombSequences.includes(sequence as Sequence);
};

const calibratePheonixRank = (nextRank: number, prevRank: number) => {
  return Number.isNaN(nextRank) ? prevRank + 0.5 : nextRank;
};

export const compareCardHandsRank = (previousCardHands: CardHand[], nextCardHand: CardHand) => {
  if (previousCardHands.length === 0) {
    return true;
  }

  const {cards: prevCards, sequence: prevSequence, rank: prevRank} = reduceCardHand(previousCardHands);
  const {cards: nextCards, sequence: nextSequence, rank: nextRank} = nextCardHand;

  return [
    // Both sequence must be non-undefined value
    [nextSequence, prevSequence].every((sequence) => sequence !== undefined),

    // Unconditionally true if `nextSequence` is bomb,
    // otherwise it must be the same sequence
    conditional(isBombSequence(nextSequence), true, nextSequence === prevSequence),

    // Unconditionally true if `nextSequence` is bomb,
    // otherwise it must have the same card count
    conditional(isBombSequence(nextSequence), true, isSameLength(nextCards, prevCards)),

    // `nextRank` must be bigger than `prevRank`
    conditional(
      isBombSequence(nextSequence),
      conditional(Number.isFinite(prevRank), nextRank > prevRank, true),
      calibratePheonixRank(nextRank, prevRank) > prevRank,
    ),
  ].every((result) => result === true);
};
