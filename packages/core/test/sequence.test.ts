import {Sequence, isValidSequence, determineSequence, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Validate cards sequence correctly", () => {
  const validSequences: Card[][] = [
    ["1"],
    ["♥A"],
    [SpecialCard.Dragon],
    [SpecialCard.Hound],
    ["♠2", "♣2"],
    ["♠2", "♣2", "♠3", "♥3"],
    ["♠10", "♦10", "♣J", "♠J"],
    ["♥K", "♦K", "♣A", "♠A"],
    ["♠2", "♣2", "♠3", "♥3", "♠4", "♥4"],
    ["♠8", "♣8", "♥8"],
    ["♠2", "♣2", "♠8", "♣8", "♥8"],
    ["♦8", "♣8", "♠8", "♠A", "♥A"],
    ["1", "♣2", "♥3", "♥4", "♦5"],
    ["♠2", "♥3", "♦4", "♠5", "♣6"],
    ["♦4", "♣5", "♣6", "♥7", "♦8", "♠9"],
    ["♥3", "♦4", "♣5", "♣6", "♥7", "♦8", "♠9"],
    ["♣6", "♣7", "♥8", "♦9", "♠10", "♠J", "♥Q"],
    ["♣5", "♣6", "♥7", "♦8", "♠9", "♠10", "♠J", "♥Q"],
    ["♠8", "♣8", "♥8", "♦8"],
    ["♥2", "♥3", "♥4", "♥5", "♥6"],
    ["♥2", "♥3", "♥4", "♥5", "♥6", "♥7"],
    ["♥6", "♥7", "♥8", "♥9", "♥10", "♥J", "♥Q"],
    ["♥4", "♥5", "♥6", "♥7", "♥8", "♥9", "♥10", "♥J", "♥Q"],
  ];
  const invalidSequence: Card[][] = [
    ["1", "♠2"],
    ["♠2", "♠3"],
    ["♥4", "♦4", "♣6", "♠6"],
    ["♥J", "♦J", "♣A", "♠A"],
    ["♣2", SpecialCard.Hound],
    ["♠4", "♠5", "♠6"],
    ["♣9", "♥J", "♥Q"],
    ["♠8", "♣8", "♥8", "♠9", "♥9", "♦9"],
    ["1", "♣2", "♥3", "♥4"],
    ["♠8", "♠8", SpecialCard.Dragon],
    ["♠4", "♠5", "♠6", SpecialCard.Dragon],
    ["♠4", "♠5", "♠6", SpecialCard.Hound],
    ["♠9", "♠J", "♠Q", "♠K"],
    [SpecialCard.Pheonix, "♥8", "♦8", "♠8"],
    ["♣2", "♦2", "♠7", "♥7", "♣8"],
    ["♠9", "♠J", "♠Q", "♠K", SpecialCard.Dragon],
    ["♠4", "♠6", "♠7", "♣8", "♠9"],
    ["♠6", "♠7", "♦8", "♠9", "♠Q"],
  ];

  validSequences.forEach((sequence) => {
    it(`[${sequence.join(", ")}] is valid sequence`, () => {
      expect(isValidSequence(sequence)).toEqual(true);
    });
  });

  invalidSequence.forEach((sequence) => {
    it(`[${sequence.join(", ")}] is invalid sequence`, () => {
      expect(isValidSequence(sequence)).toEqual(false);
    });
  });
});

describe("Determine cards sequence correctly", () => {
  const sequences: {[K in Sequence]: Card[][]} = {
    leaf: [["1"], [SpecialCard.Hound], [SpecialCard.Pheonix], [SpecialCard.Dragon], ["♠3"], ["♥Q"]],
    pair: [
      ["♠2", "♣2"],
      ["♠A", "♣A"],
    ],
    consecutivePairs: [
      ["♠2", "♣2", "♥3", "♦3"],
      ["♠9", "♥9", "♦10", "♠10"],
      ["♠10", "♥10", "♦J", "♠J"],
      ["♥Q", "♦Q", "♠K", "♥K"],
      ["♥Q", "♦Q", "♠K", "♥K", "♦A", "♥A"],
    ],
    triple: [
      ["♠3", "♣3", "♥3"],
      ["♣A", "♣A", "♦A"],
    ],
    fullHouse: [
      ["♣A", "♥A", "♠A", "♦4", "♦4"],
      ["♣2", "♦2", "♠7", "♥7", "♣7"],
      ["♣2", "♠7", "♦2", "♥7", "♣7"],
    ],
    straight: [
      ["1", "♣2", "♥3", "♥4", "♦5"],
      ["♣2", "♥3", "♥4", "♦5", "♠6"],
      ["♣2", "♥3", "♥4", "♦5", "♠6", "♦7"],
      ["♥9", "♠10", "♣J", "♠Q", "♣K"],
    ],
    squareBomb: [
      ["♠8", "♣8", "♥8", "♦8"],
      ["♦A", "♥A", "♠A", "♣A"],
    ],
    straightBomb: [
      ["♣2", "♣3", "♣4", "♣5", "♣6"],
      ["♦2", "♦3", "♦4", "♦5", "♦6", "♦7"],
      ["♥9", "♥10", "♥J", "♥Q", "♥K"],
    ],
  };

  Object.entries(sequences).forEach(([name, sequences]) => {
    sequences.forEach((sequence) => {
      it(`[${sequence.join(", ")}] must be '${name}'`, () => {
        expect(determineSequence(sequence)).toEqual(name);
      });
    });
  });
});
