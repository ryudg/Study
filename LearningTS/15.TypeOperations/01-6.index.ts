// 15.TypeOperations/01-6.index.ts

interface Environmentalist {
  area: string;
  name: string;
}

type ReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]: Environmentalist[K];
};
// {
//   readonly area: string;
//   readonly name: string;
// }

type OptionalReadonlyEnvironmentalist = {
  readonly [K in keyof Environmentalist]?: Environmentalist[K];
};
// {
//   readonly area?: string;
//   readonly name?: string;
// }
