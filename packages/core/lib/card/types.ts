export type Shape = "♠" | "♥" | "♦" | "♣";
export type Numeric = "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "10" | "J" | "Q" | "K" | "A";
export type MahJong = "1";
export type Hound = "犬";
export type Pheonix = "鳥";
export type Dragon = "龍";

export type Card = `${Shape}${Numeric}` | MahJong | Hound | Pheonix | Dragon;
