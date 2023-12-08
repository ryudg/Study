// 14.TypeOperations/02-2.conditionalType.ts

type CheckAgatinstNumber<T> = T extends number ? true : false;

type CheckString1 = CheckAgatinstNumber<"parakeet">; // false

type CheckString2 = CheckAgatinstNumber<1>; // true

type CheckString3 = CheckAgatinstNumber<number>; // true
