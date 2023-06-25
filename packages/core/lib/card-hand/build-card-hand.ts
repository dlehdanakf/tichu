import {calculateRank, determineSequence} from "@package/core";
import type {Card} from "@package/core";
import type {CardHand} from "./types";

export const buildCardHand = (cards: Card[]): CardHand => {
  const sequence = determineSequence(cards);
  const rank = calculateRank(sequence, cards);

  return {
    cards,
    sequence,
    rank,
  };
};
