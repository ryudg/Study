// 14.TypeOperations/02-8.conditionalType.ts

type MakeAllMembersFunction<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? T[K] : () => T[K];
};

type MemberFunctions = MakeAllMembersFunction<{
  alreadyFunction: () => string;
  notYetFunction: number;
}>;
// {
//   alreadyFunction: () => string;
//   notYetFunction: () => number;
// }
