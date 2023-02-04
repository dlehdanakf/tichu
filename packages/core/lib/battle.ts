import {calculateRank, determineCombination, isValidCombination} from "@package/core";
import type {Card} from "@package/core";
import {isSameLength, notNullish} from "@package/core/utils";

export const battle = (
  defender: Card[],
  challenger: Card[],
): {result: boolean; defender: Card[]; challenger: Card[]} => {
  const result = (() => {
    const lengthValidation = isSameLength(defender, challenger);
    const combinationValidation = isValidCombination(challenger);

    if (lengthValidation && combinationValidation) {
      const defenderCombination = determineCombination(defender);
      const challengerCombination = determineCombination(challenger);

      const defenderRank = notNullish(calculateRank(defenderCombination, defender), 0.5);
      const challengerRank = notNullish(calculateRank(challengerCombination, challenger), defenderRank + 0.5);

      return defenderCombination === challengerCombination && challengerRank > defenderRank;
    }

    return false;
  })();

  return {result, defender, challenger};
};
