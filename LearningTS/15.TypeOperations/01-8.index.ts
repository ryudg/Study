// 15.TypeOperations/01-8.index.ts

type MakeReadOnly<T> = {
  readonly [K in keyof T]: T[K];
};

interface Species {
  genus: string;
  name: string;
}

type ReadonlySpecies = MakeReadOnly<Species>;
// {
//   readonly genus: string;
//   readonly name: string;
// }
