import {activatePheonix, calculateRank, Card, determineCombination, isValidCombination} from "@package/core";
import {isSameLength, notNullish} from "./utils";

export const battle = (defender: Card[], challenger: Card[]) => {
  const pheonixActivatedChallenger = activatePheonix(challenger);
  const result = (() => {
    const lengthValidation = isSameLength(defender, pheonixActivatedChallenger);
    const combinationValidation = isValidCombination(pheonixActivatedChallenger);

    if (lengthValidation && combinationValidation) {
      const defenderCombination = determineCombination(defender);
      const challengerCombination = determineCombination(pheonixActivatedChallenger);

      const defenderRank = notNullish(calculateRank(defenderCombination, defender), 0.5);
      const challengerRank = notNullish(
        calculateRank(challengerCombination, pheonixActivatedChallenger),
        defenderRank + 0.5,
      );

      return defenderCombination === challengerCombination && challengerRank > defenderRank;
    }

    return false;
  })();

  return {result, defender, challenger: pheonixActivatedChallenger};
};
