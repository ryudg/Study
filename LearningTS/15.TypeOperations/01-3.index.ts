// 15.TypeOperations/01-3.index.ts

interface AnimalVariants {
  alligator: string;
  baboon: string;
  cat: string;
}

type AnimalCounts = {
  [K in keyof AnimalVariants]: number;
};
// {
//   alligator: number;
//   baboon: number;
//   cat: number;
// }
