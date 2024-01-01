// 14.TypeOperations/02-5.conditionalType.ts

type ArrayifUnlessString<T> = T extends string ? T : T[];

type HalfArrayified = ArrayifUnlessString<string | number>;
