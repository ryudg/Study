// 14.TypeOperations/04-5.templateLiteral.ts

interface DataEntry<T> {
  ket: T;
  value: string;
}

type Datakey = "location" | "name" | "year";

type DataEntryGetters = {
  [K in DataKey as `get${Capitalize<K>}`]: () => DataEntry<K>;
};
// {
//   getLocation: () => DataEntry<"location">;
//   getName: () => DataEntry<"name">;
//   getYear: () => DataEntry<"year">;
// }
