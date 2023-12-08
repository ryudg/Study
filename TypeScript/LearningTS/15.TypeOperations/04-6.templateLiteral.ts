// 14.TypeOperations/04-6.templateLiteral.ts

const config = {
  location: "unknown",
  name: "anonymous",
  year: 0,
};

type LazyValues = {
  [K in keyof typeof config as `${K}Lazy`]: () => Promise<(typeof config)[K]>;
};
// {
//   locationLazy: () => Promise<string>;
//   nameLazy: () => Promise<string>;
//   yearLazy: () => Promise<number>;
// }

async function withLazyValues(configGetter: LazyValues) {
  await configGetter.locationLazy(); // 결과 타입은 string
  await configGetter.nameLazy(); // 결과 타입은 string
  await configGetter.yearLazy(); // 결과 타입은 number

  await configGetter.missingLazy();
  //                 ^^^^^^^^^^^ Property 'missingLazy' does not exist on type 'LazyValues'.
}
