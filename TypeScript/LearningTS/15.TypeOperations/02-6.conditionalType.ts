// 14.TypeOperations/02-6.conditionalType.ts

type ArrayItems<T> = T extends (infer Item)[] ? Item : T;

type StringItem = ArrayItems<string>; // string

type StringArrayItem = ArrayItems<string[]>; // string

type String2DItem = ArrayItems<string[][]>; // string[]
