import {calculateRank, determineSequence, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Calculate rank score correctly", () => {
  const testCases: {sequence: Card[]; rank: number}[] = [
    {
      sequence: [SpecialCard.Hound],
      rank: 0,
    },
    {
      sequence: ["1"],
      rank: 1,
    },
    {
      sequence: [SpecialCard.Pheonix],
      rank: NaN,
    },
    {
      sequence: [SpecialCard.Dragon],
      rank: Infinity,
    },
    {
      sequence: ["♥9"],
      rank: 9,
    },
    {
      sequence: ["♥A"],
      rank: 14,
    },
    {
      sequence: ["♥4", "♣4"],
      rank: 4,
    },
    {
      sequence: ["♥3", "♣4"],
      rank: -Infinity,
    },
    {
      sequence: ["♥3", "♣3", "♦3"],
      rank: 3,
    },
    {
      sequence: ["♥A", "♣A", "♦A"],
      rank: 14,
    },
    {
      sequence: ["♠6", "♣6", "♥7", "♦7"],
      rank: 7,
    },
    {
      sequence: ["♠6", "♣6", "♥8", "♦8"],
      rank: -Infinity,
    },
    {
      sequence: ["♠2", "♣2", "♥2", "♥3", "♦3"],
      rank: 2,
    },
    {
      sequence: ["♠2", "♣2", "♥3", "♥3", "♦3"],
      rank: 3,
    },
    {
      sequence: ["1", "♠2", "♥3", "♥4", "♥5"],
      rank: 5,
    },
    {
      sequence: ["♠8", "♥9", "♥10", "♠J", "♦Q", "♣K", "♠A"],
      rank: 14,
    },
    {
      sequence: ["♠8", "♣8", "♥8", "♦8"],
      rank: 800,
    },
    {
      sequence: ["♠A", "♣A", "♥A", "♦A"],
      rank: 1400,
    },
    {
      sequence: ["♠2", "♠3", "♠4", "♠5", "♠6"],
      rank: 60000,
    },
    {
      sequence: ["♠2", "♠3", "♠4", "♠5", "♣6"],
      rank: 6,
    },
  ];

  testCases.forEach(({sequence, rank}) => {
    it(`[${sequence.join(", ")}] rank score must be {${rank}}`, () => {
      expect(calculateRank(determineSequence(sequence), sequence)).toEqual(rank);
    });
  });
});
