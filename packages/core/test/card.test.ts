import {CardShape, SpecialCard} from "@package/core";
import type {Card} from "@package/core";

describe("Determine card shape correctly", () => {
  const shapes = ["♠", "♥", "♦", "♣"];
  const numbers = ["2", "3", "4", "5", "6", "7", "8", "9", "J", "Q", "K"];
  const specialCards = Object.values(SpecialCard);

  shapes.forEach((shape) => {
    numbers.forEach((number) => {
      const card = `${shape}${number}`;

      it(`"${card}" card shape is "${shape}"`, () => {
        expect(CardShape[card as Card]).toEqual(shape);
      });
    });
  });
  specialCards.forEach((card) => {
    it(`"${card}" card shape is ""`, () => {
      expect(CardShape[card as Card]).toEqual("");
    });
  });
});
