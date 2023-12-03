// 15.TypeOperations/01-4.index.ts

interface BirdVariants {
  dove: string;
  eagle: string;
}

type NullableBirdVariants = {
  [K in keyof BirdVariants]: BirdVariants[K] | null;
};
// {
//   dove: string | null;
//   eagle: string | null;
// }
