// 15.TypeOperations/01-1.index.ts

type NewType = {
  [key in OriginalType]: NewProperty;
};
