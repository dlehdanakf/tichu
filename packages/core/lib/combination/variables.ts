import type {Combination} from "./types";

export const BombCombinations: Combination[] = ["squareBomb", "straightBomb"];

export const NormalCombinations: Combination[] = [
  "straight",
  "fullHouse",
  "triple",
  "consecutivePairs",
  "pair",
  "leaf",
];

export const Combinations: Combination[] = [...BombCombinations, ...NormalCombinations];
