import type {Card, Sequence} from "@package/core";

export type CardHand = {
  cards: Card[];
  sequence: Sequence | undefined;
  rank: number;
};
