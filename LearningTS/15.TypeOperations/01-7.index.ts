// 15.TypeOperations/01-7.index.ts

interface Conservartionist {
  name: string;
  catchphrase?: string;
  readonly born: number;
  readonly died?: number;
}

type WriteableConservartionist = {
  -readonly [K in keyof Conservartionist]: Conservartionist[K];
};
// {
//   name: string;
//   catchphrase?: string | undefined;
//   born: number;
//   died?: number | undefined;
// }

type RequiredWriteableConservartionist = {
  [K in keyof WriteableConservartionist]-?: WriteableConservartionist[K];
};
// {
//   name: string;
//   catchphrase: string;
//   born: number;
//   died: number;
// }
