import {CardScore} from "@package/core";
import type {Card} from "@package/core";

export const calculateScore = (cards: Card[]) => {
  return cards.reduce((acc, cur) => acc + CardScore[cur], 0);
};
