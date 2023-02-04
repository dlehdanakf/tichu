import {CardShape, CardValue, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Determine cards shape correctly", () => {
  const shapes = ["♠", "♥", "♦", "♣"];
  const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"];
  const specialCards = Object.values(SpecialCard);

  shapes.forEach((shape) => {
    numbers.forEach((number) => {
      const card = `${shape}${number}`;

      it(`'${card}' card shape must be '${shape}'`, () => {
        expect(CardShape[card as Card]).toEqual(shape);
      });
    });
  });

  specialCards.forEach((card) => {
    it(`'${card}' card shape must be ''`, () => {
      expect(CardShape[card as Card]).toEqual("");
    });
  });
});

describe("Determine cards value correctly", () => {
  const shapes = ["♠", "♥", "♦", "♣"];
  const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K", "A"];
  const values = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13];

  const specialCards = Object.values(SpecialCard);
  const specialValues = [1, 0, NaN, Infinity];

  shapes.forEach((shape) => {
    numbers.forEach((number, index) => {
      const card = `${shape}${number}`;
      const value = values[index];

      it(`'${card}' card value must be {${value}}`, () => {
        expect(CardValue[card as Card]).toEqual(value);
      });
    });
  });

  specialCards.forEach((card, index) => {
    it(`'${card}' card value must be {${specialValues[index]}}`, () => {
      expect(CardValue[card as Card]).toEqual(specialValues[index]);
    });
  });
});
