import {isSameLength} from "@package/core/utils";
import {reduceCardHand} from "./reduce-card-hand";
import type {CardHand} from "./types";

export const compareCardHandsRank = (previousCardHands: CardHand[], nextCardHand: CardHand) => {
  if (previousCardHands.length === 0) {
    return true;
  }

  const {cards: prevCards, combination: prevCombination, rank: prevRank} = reduceCardHand(previousCardHands);
  const {cards: nextCards, combination: nextCombination, rank: nextRank} = nextCardHand;

  return [
    isSameLength(nextCards, prevCards),
    nextCombination !== undefined && prevCombination !== undefined,
    nextCombination === prevCombination,
    nextRank > prevRank,
  ].every((result) => result === true);
};
