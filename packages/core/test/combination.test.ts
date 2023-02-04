import {isValidCombination, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Validate cards combination correctly", () => {
  const validCombinations: Card[][] = [
    ["1"],
    ["♥A"],
    [SpecialCard.Dragon],
    [SpecialCard.Dog],
    ["♠2", "♣2"],
    ["♠2", "♣2", "♠3", "♥3"],
    ["♠9", "♦9", "♣J", "♠J"],
    ["♥K", "♦K", "♣A", "♠A"],
    ["♠8", "♣8", "♥8"],
    ["♠2", "♣2", "♠8", "♣8", "♥8"],
    ["♦8", "♣8", "♠8", "♠A", "♥A"],
    ["1", "♣2", "♥3", "♥4", "♦5"],
    ["♠2", "♥3", "♦4", "♠5", "♣6"],
    ["♦4", "♣5", "♣6", "♥7", "♦8", "♠9"],
    ["♥3", "♦4", "♣5", "♣6", "♥7", "♦8", "♠9"],
    ["♣5", "♣6", "♥7", "♦8", "♠9", "♠J", "♥Q"],
    ["♦4", "♣5", "♣6", "♥7", "♦8", "♠9", "♠J", "♥Q"],
    ["♠8", "♣8", "♥8", "♦8"],
    ["♥2", "♥3", "♥4", "♥5", "♥6"],
    ["♥2", "♥3", "♥4", "♥5", "♥6", "♥7"],
    ["♥6", "♥7", "♥8", "♥9", "♥J", "♥Q"],
    ["♥4", "♥5", "♥6", "♥7", "♥8", "♥9", "♥J", "♥Q"],
  ];
  const invalidCombination: Card[][] = [
    ["1", "♠2"],
    ["♠2", "♠3"],
    ["♥4", "♦4", "♣6", "♠6"],
    ["♥J", "♦J", "♣A", "♠A"],
    ["♠2", "♣2", "♠3", "♥3", "♠4", "♥4"],
    ["♣2", SpecialCard.Dog],
    ["♠4", "♠5", "♠6"],
    ["♣9", "♥J", "♥Q"],
    ["♠8", "♣8", "♥8", "♠9", "♥9", "♦9"],
    ["1", "♣2", "♥3", "♥4"],
    ["♠8", "♠8", SpecialCard.Dragon],
    ["♠4", "♠5", "♠6", SpecialCard.Dragon],
    ["♠4", "♠5", "♠6", SpecialCard.Dog],
    ["♠9", "♠J", "♠Q", "♠K"],
    ["♠9", "♠J", "♠Q", "♠K", SpecialCard.Dragon],
    ["♠4", "♠6", "♠7", "♣8", "♠9"],
    ["♠6", "♠7", "♦8", "♠9", "♠Q"],
  ];

  validCombinations.forEach((combination) => {
    it(`[${combination.join(", ")}] is valid combination`, () => {
      expect(isValidCombination(combination)).toEqual(true);
    });
  });

  invalidCombination.forEach((combination) => {
    it(`[${combination.join(", ")}] is invalid combination`, () => {
      expect(isValidCombination(combination)).toEqual(false);
    });
  });
});
