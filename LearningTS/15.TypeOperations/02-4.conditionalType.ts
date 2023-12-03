export {};
// 14.TypeOperations/02-4.conditionalType.ts

interface QueryOptions {
  throwIfNotFound: boolean;
}

type QueryResult<Options extends QueryOptions> =
  Options["throwIfNotFound"] extends true ? string : string | undefined;

declare function retrieve<Options extends QueryOptions>(
  key: string,
  options?: Options
): Promise<QueryResult<Options>>;

const result1 = await retrieve("Birutė Galdikas"); // string | undefined
const result2 = await retrieve("Jane Goodal", {
  throwIfNotFound: Math.random() > 0.5,
}); // string | undefined
const result3 = await retrieve("Dian Fossey", { throwIfNotFound: true }); // string
