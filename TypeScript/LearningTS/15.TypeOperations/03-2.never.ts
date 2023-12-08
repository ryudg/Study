// 14.TypeOperations/03-2.never.ts

type OnlyStrings<T> = T extends string ? T : never;

type RedOrBlue = OnlyStrings<"red" | "blue" | 0 | false>; // "red" | "blue"
