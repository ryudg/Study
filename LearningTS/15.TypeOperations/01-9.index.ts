// 15.TypeOperations/01-9.index.ts

interface GenusData {
  family: string;
  name: string;
}

type MakeOptional<T> = {
  [K in keyof T]?: T[K];
};
// {
//   family?: string;
//   name?: string;
// }

/**
 * GenusData의 기본값 위에 모든 {overrides}를 구조 분해 할당합니다.
 */
function createGenusData(overrides?: MakeOptional<GenusData>): GenusData {
  return {
    family: "Felidae",
    name: "Felis",
    ...overrides,
  };
}
