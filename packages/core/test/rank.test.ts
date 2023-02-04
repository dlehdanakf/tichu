import {calculateRank, determineCombination, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Calculate rank score correctly", () => {
  const testCases: {combination: Card[]; rank: number}[] = [
    {
      combination: [SpecialCard.Dog],
      rank: 0,
    },
    {
      combination: ["1"],
      rank: 1,
    },
    {
      combination: [SpecialCard.Pheonix],
      rank: NaN,
    },
    {
      combination: [SpecialCard.Dragon],
      rank: Infinity,
    },
    {
      combination: ["♥9"],
      rank: 9,
    },
    {
      combination: ["♥A"],
      rank: 13,
    },
    {
      combination: ["♥4", "♣4"],
      rank: 4,
    },
    {
      combination: ["♥3", "♣4"],
      rank: -Infinity,
    },
    {
      combination: ["♥3", "♣3", "♦3"],
      rank: 3,
    },
    {
      combination: ["♥A", "♣A", "♦A"],
      rank: 13,
    },
    {
      combination: ["♠6", "♣6", "♥7", "♦7"],
      rank: 7,
    },
    {
      combination: ["♠6", "♣6", "♥8", "♦8"],
      rank: -Infinity,
    },
    {
      combination: ["♠2", "♣2", "♥2", "♥3", "♦3"],
      rank: 2,
    },
    {
      combination: ["♠2", "♣2", "♥3", "♥3", "♦3"],
      rank: 3,
    },
    {
      combination: ["1", "♠2", "♥3", "♥4", "♥5"],
      rank: 5,
    },
    {
      combination: ["♠8", "♥9", "♠J", "♦Q", "♣K", "♠A"],
      rank: 13,
    },
    {
      combination: ["♠8", "♣8", "♥8", "♦8"],
      rank: 800,
    },
    {
      combination: ["♠A", "♣A", "♥A", "♦A"],
      rank: 1300,
    },
    {
      combination: ["♠2", "♠3", "♠4", "♠5", "♠6"],
      rank: 600,
    },
    {
      combination: ["♠2", "♠3", "♠4", "♠5", "♣6"],
      rank: 6,
    },
  ];

  testCases.forEach(({combination, rank}) => {
    it(`[${combination.join(", ")}] rank score must be {${rank}}`, () => {
      expect(calculateRank(determineCombination(combination), combination)).toEqual(rank);
    });
  });
});
