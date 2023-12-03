// 14.TypeOperations/04-7.templateLiteral.ts

type TurnIntoGetterDirect<T> = {
  [K in keyof T as `get${Capitalize<K>}`]: () => T[K];
  //                                ^ Type 'K' does not satisfy the constraint 'string'.
  //                                  Type 'keyof T' is not assignable to type 'string'.
  //                                  Type 'string | number | symbol' is not assignable to type 'string'.
  //                                  Type 'number' is not assignable to type 'string'.
};
