// 14.TypeOperations/04-8.templateLiteral.ts

const someSymbol = Symbol("");

interface HasStringAndSymbol {
  StringKey: string;
  [someSymbol]: number;
}

type TurnIntoGetters<T> = {
  [K in keyof T as `get${string & K}`]: () => T[K];
};

type GettersJustString = TurnIntoGetters<HasStringAndSymbol>;
// {
//   getStringKey: () => string;
// }
