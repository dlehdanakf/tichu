export const isLength = <T>({length}: T[], expect: number) => length === expect;
export const isLengthAtLeast = <T>({length}: T[], expect: number) => length >= expect;
export const isSameLength = <T>({length: target}: T[], {length: compare}: T[]) => target === compare;
export const isAllSame = <T>(values: T[]) => values.every((value, _, [first]) => value === first);
export const isSplittedGroupSame = <T>(values: T[], pivot: number) =>
  isAllSame(values.slice(0, pivot)) && isAllSame(values.slice(pivot));
export const isIncreasing = (values: number[]) =>
  isLengthAtLeast(values, 2) && values.slice(1).every((value, index) => values[index] + 1 === value);

export const first = <T>(values: T[], fallback: T) => values.at(0) ?? fallback;
export const last = <T>(values: T[], fallback: T) => values.at(-1) ?? fallback;
export const notNullish = (value: number, fallback: number) => (Number.isNaN(value) ? fallback : value);
