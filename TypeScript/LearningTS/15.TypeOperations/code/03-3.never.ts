// 14.TypeOperations/03-3.never.ts

type FisrParameter<T extends (...args: any[]) => any> = T extends (
  arg: infer Arg
) => any
  ? Arg
  : never;

type GetsString = FisrParameter<(arg0: string) => void>; // string
