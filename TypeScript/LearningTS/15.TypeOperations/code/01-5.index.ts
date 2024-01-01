// 15.TypeOperations/01-5.index.ts

interface Researcher {
  researchMember(): void;
  researchProperty: () => string;
}

type JustProperties<T> = {
  [K in keyof T]: T[K];
};

type ResearcherProperties = JustProperties<Researcher>;
// {
//   researchMember: () => void;
//   researchProperty: () => string;
// }
