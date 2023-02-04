import type {Card, Combination} from "@package/core";

export type CardHand = {
  cards: Card[];
  combination: Combination | undefined;
  rank: number;
};
