import type {Sequence} from "./types";

export const BombSequences: Sequence[] = ["squareBomb", "straightBomb"];

export const NormalSequences: Sequence[] = ["straight", "fullHouse", "triple", "consecutivePairs", "pair", "leaf"];

export const Sequences: Sequence[] = [...BombSequences, ...NormalSequences];
