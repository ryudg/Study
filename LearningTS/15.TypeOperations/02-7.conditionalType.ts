// 14.TypeOperations/02-7.conditionalType.ts

type ArrayItemsRecursive<T> = T extends (infer Item)[]
  ? ArrayItemsRecursive<Item>
  : T;

type StringItem = ArrayItemsRecursive<string>; // string

type StringArrayItem = ArrayItemsRecursive<string[]>; // string

type String2DItem = ArrayItemsRecursive<string[][]>; // string
