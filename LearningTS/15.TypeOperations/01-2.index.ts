// 15.TypeOperations/01-2.index.ts

type Animals = "alligator" | "baboon" | "cat";

type AnimalCounts = {
  [K in Animals]: number;
};
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }
