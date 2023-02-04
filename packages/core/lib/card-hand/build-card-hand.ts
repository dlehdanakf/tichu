import {calculateRank, determineCombination} from "@package/core";
import type {Card} from "@package/core";
import type {CardHand} from "./types";

export const buildCardHand = (cards: Card[]): CardHand => {
  const combination = determineCombination(cards);
  const rank = calculateRank(combination, cards);

  return {
    cards,
    combination,
    rank,
  };
};
