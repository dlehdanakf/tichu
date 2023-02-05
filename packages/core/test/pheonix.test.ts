import {activatePheonix, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Activate pheonix card properly", () => {
  const testCases: {before: Card[]; after: Card[]}[] = [
    {
      before: ["♠8"],
      after: ["♠8"],
    },
    {
      before: [SpecialCard.Pheonix],
      after: [SpecialCard.Pheonix],
    },
    {
      before: ["♠8", "♥8"],
      after: ["♠8", "♥8"],
    },
    {
      before: [SpecialCard.Pheonix, "♥9"],
      after: ["♥9", "♣9"],
    },
    {
      before: [SpecialCard.Pheonix, "♥9", "♦9"],
      after: ["♥9", "♣9", "♦9"],
    },
    {
      before: [SpecialCard.Pheonix, "♥2", "♦3", "♥3"],
      after: ["♣2", "♥2", "♦3", "♥3"],
    },
    {
      before: [SpecialCard.Pheonix, "♥2", "♦2", "♦3", "♥3"],
      after: ["♥2", "♦2", "♣3", "♥3", "♦3"],
    },
    {
      before: [SpecialCard.Pheonix, "♥2", "♦2", "♦A", "♥A"],
      after: ["♥2", "♦2", "♦A", "♥A", "♣A"],
    },
    {
      before: [SpecialCard.Pheonix, "♥2", "♦3", "♦4", "♥5"],
      after: ["♥2", "♦3", "♦4", "♥5", "♣6"],
    },
    {
      before: [SpecialCard.Pheonix, "♥8", "♦9", "♦Q", "♥K"],
      after: ["♥8", "♦9", "♣J", "♦Q", "♥K"],
    },
    {
      before: [SpecialCard.Pheonix, "♥7", "♦9", "♦Q", "♥K"],
      after: [SpecialCard.Pheonix, "♥7", "♦9", "♦Q", "♥K"],
    },
    {
      before: [SpecialCard.Pheonix, "♥8", "♦8", "♠8"],
      after: [SpecialCard.Pheonix, "♥8", "♦8", "♠8"],
    },
    {
      before: [SpecialCard.Pheonix, "♥6", "♥7", "♥8", "♥9"],
      after: ["♥6", "♥7", "♥8", "♥9", "♣J"],
    },
  ];

  testCases.forEach(({before, after}) => {
    it(`[${before.join(", ")}] must be [${after.join(", ")}]`, () => {
      expect(activatePheonix(before).slice().sort()).toEqual(after.slice().sort());
    });
  });
});
