import {buildCardHand, compareCardHandsRank, reduceCardHand, SpecialCard} from "@package/core";
import type {CardHand} from "@package/core";

describe("Build card hands correctly", () => {
  const testCases: CardHand[] = [
    {
      cards: [],
      sequence: undefined,
      rank: -Infinity,
    },
    {
      cards: [SpecialCard.Hound],
      sequence: "leaf",
      rank: 0,
    },
    {
      cards: [SpecialCard.Wish],
      sequence: "leaf",
      rank: 1,
    },
    {
      cards: [SpecialCard.Pheonix],
      sequence: "leaf",
      rank: NaN,
    },
    {
      cards: [SpecialCard.Dragon],
      sequence: "leaf",
      rank: Infinity,
    },
    {
      cards: ["♠7"],
      sequence: "leaf",
      rank: 7,
    },
    {
      cards: ["♣A"],
      sequence: "leaf",
      rank: 14,
    },
    {
      cards: ["♠2", "♥2"],
      sequence: "pair",
      rank: 2,
    },
    {
      cards: ["♠2", "♣2", "♠3", "♥3"],
      sequence: "consecutivePairs",
      rank: 3,
    },
    {
      cards: ["♠2", "♣2", "♥2"],
      sequence: "triple",
      rank: 2,
    },
    {
      cards: ["♠2", "♣2", "♥2", "♠3", "♦3"],
      sequence: "fullHouse",
      rank: 2,
    },
    {
      cards: ["♠2", "♣2", "♥3", "♠3", "♦3"],
      sequence: "fullHouse",
      rank: 3,
    },
    {
      cards: [SpecialCard.Wish, "♥2", "♦3", "♠4", "♣5"],
      sequence: "straight",
      rank: 5,
    },
    {
      cards: ["♠8", "♥9", "♣10", "♠J", "♥Q", "♠K"],
      sequence: "straight",
      rank: 13,
    },
    {
      cards: ["♠2", "♣2", "♥2", "♦2"],
      sequence: "squareBomb",
      rank: 200,
    },
    {
      cards: ["♠2", "♠3", "♠4", "♠5", "♠6"],
      sequence: "straightBomb",
      rank: 60000,
    },
    {
      cards: [SpecialCard.Dragon, "♠5"],
      sequence: undefined,
      rank: -Infinity,
    },
    {
      cards: ["1", "♠2", "♣3"],
      sequence: undefined,
      rank: -Infinity,
    },
  ];

  testCases.forEach(({cards, sequence, rank}) => {
    it(`Build card hand from [${cards.join(", ")}] cards correctly`, () => {
      const result = buildCardHand(cards);

      expect(result.cards.slice().sort()).toEqual(cards.slice().sort());
      expect(result.sequence).toEqual(sequence);
      expect(result.rank).toEqual(rank);
    });
  });
});

describe("Reduce card hands correctly", () => {
  const testCases: {target: CardHand[]; reduced: CardHand}[] = [
    {
      target: [buildCardHand([SpecialCard.Wish])],
      reduced: {
        cards: [SpecialCard.Wish],
        sequence: "leaf",
        rank: 1,
      },
    },
    {
      target: [buildCardHand([SpecialCard.Pheonix])],
      reduced: {
        cards: [SpecialCard.Pheonix],
        sequence: "leaf",
        rank: 0.5,
      },
    },
    {
      target: [buildCardHand(["♠4"])],
      reduced: {
        cards: ["♠4"],
        sequence: "leaf",
        rank: 4,
      },
    },
    {
      target: [buildCardHand(["♠4"]), buildCardHand(["♥A"])],
      reduced: {
        cards: ["♥A"],
        sequence: "leaf",
        rank: 14,
      },
    },
    {
      target: [buildCardHand(["♠4"]), buildCardHand(["♥A"]), buildCardHand([SpecialCard.Dragon])],
      reduced: {
        cards: [SpecialCard.Dragon],
        sequence: "leaf",
        rank: Infinity,
      },
    },
    {
      target: [buildCardHand(["♠4"]), buildCardHand(["♥A"]), buildCardHand([SpecialCard.Pheonix])],
      reduced: {
        cards: [SpecialCard.Pheonix],
        sequence: "leaf",
        rank: 14.5,
      },
    },
    {
      target: [buildCardHand(["♥A"]), buildCardHand([SpecialCard.Dragon]), buildCardHand([SpecialCard.Pheonix])],
      reduced: {
        cards: [SpecialCard.Pheonix],
        sequence: "leaf",
        rank: Infinity,
      },
    },
    {
      target: [buildCardHand(["♠4", "♥4"]), buildCardHand(["♥8", "♦8"])],
      reduced: {
        cards: ["♥8", "♦8"],
        sequence: "pair",
        rank: 8,
      },
    },
    {
      target: [buildCardHand(["♠4", "♥4", "♥4", "♠Q", "♥Q"]), buildCardHand(["♥8", "♦8", "♠8", "♠2", "♦2"])],
      reduced: {
        cards: ["♥8", "♦8", "♠8", "♠2", "♦2"],
        sequence: "fullHouse",
        rank: 8,
      },
    },
    {
      target: [buildCardHand(["♠4", "♥4", "♥4", "♠Q", "♥Q"]), buildCardHand(["♥8", "♦8", "♠8", "♦8"])],
      reduced: {
        cards: ["♥8", "♦8", "♠8", "♦8"],
        sequence: "squareBomb",
        rank: 800,
      },
    },
    {
      target: [buildCardHand(["♠4", "♥4", "♥4", "♠Q", "♥Q"]), buildCardHand(["♠2", "♠3", "♠4", "♠5", "♠6"])],
      reduced: {
        cards: ["♠2", "♠3", "♠4", "♠5", "♠6"],
        sequence: "straightBomb",
        rank: 60000,
      },
    },
    {
      target: [buildCardHand(["♠2", "♠3", "♠4", "♠5", "♠6"]), buildCardHand(["♥8", "♦8", "♠8", "♦8"])],
      reduced: {
        cards: ["♥8", "♦8", "♠8", "♦8"],
        sequence: "squareBomb",
        rank: 800,
      },
    },
    {
      target: [buildCardHand(["♠4"]), buildCardHand(["♠5", "♥5"])],
      reduced: {
        cards: ["♠5", "♥5"],
        sequence: undefined,
        rank: 5,
      },
    },
  ];

  testCases.forEach(({target, reduced}) => {
    const before = `[[${target.map(({cards}) => cards.join(", ")).join("], [")}]]`;
    const after = `[${reduced.cards.join(", ")}]`;

    it(`Reduced ${before} must be ${after}`, () => {
      const result = reduceCardHand(target);

      expect(result.cards.slice().sort()).toEqual(reduced.cards.slice().sort());
      expect(result.sequence).toEqual(reduced.sequence);
      expect(result.rank).toEqual(reduced.rank);
    });
  });
});

describe("Compare card hands rank correctly", () => {
  const testCases: {prev: CardHand[]; next: CardHand; result: boolean}[] = [
    {prev: [], next: buildCardHand([SpecialCard.Hound]), result: true},
    {prev: [buildCardHand([SpecialCard.Pheonix])], next: buildCardHand([SpecialCard.Wish]), result: true},
    {prev: [buildCardHand([SpecialCard.Wish])], next: buildCardHand(["♠2"]), result: true},
    {prev: [buildCardHand(["♥A"])], next: buildCardHand([SpecialCard.Pheonix]), result: true},
    {prev: [buildCardHand([SpecialCard.Dragon])], next: buildCardHand([SpecialCard.Pheonix]), result: false},
    {prev: [buildCardHand([SpecialCard.Dragon])], next: buildCardHand(["♥A"]), result: false},
    {prev: [buildCardHand(["♠4"])], next: buildCardHand(["♠A"]), result: true},
    {prev: [buildCardHand(["♠4"])], next: buildCardHand(["♠A", "♦A"]), result: false},
    {prev: [buildCardHand(["♠4"])], next: buildCardHand(["♠A", "♣A", "♥A", "♦A"]), result: true},
    {prev: [buildCardHand([SpecialCard.Dragon])], next: buildCardHand(["♠A", "♣A", "♥A", "♦A"]), result: true},
    {prev: [buildCardHand(["♠4"])], next: buildCardHand(["♠2", "♠3", "♠4", "♠5", "♠6"]), result: true},
    {prev: [buildCardHand([SpecialCard.Dragon])], next: buildCardHand(["♠2", "♠3", "♠4", "♠5", "♠6"]), result: true},
    {
      prev: [buildCardHand(["♠2", "♠3", "♠4", "♠5", "♠6"])],
      next: buildCardHand(["♠A", "♣A", "♥A", "♦A"]),
      result: false,
    },
    {
      prev: [buildCardHand(["♠A", "♣A", "♥A", "♦A"])],
      next: buildCardHand(["♠2", "♠3", "♠4", "♠5", "♠6"]),
      result: true,
    },
  ];

  testCases.forEach(({prev, next, result}) => {
    const before = `[[${prev.map(({cards}) => cards.join(", ")).join("], [")}]]`;
    const after = `[${next.cards.join(", ")}]`;

    it(`${after} ${result ? "can" : "cannot"} beat ${before}`, () => {
      expect(compareCardHandsRank(prev, next)).toEqual(result);
    });
  });
});
