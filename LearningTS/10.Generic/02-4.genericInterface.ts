// 10.Generic/02-4.genericInterface.ts

interface CrateLike<T> {
  contents: T;
}

let missingGeneric: CrateLike = {
  //                ^^^^^^^^^ Generic type 'CrateLike<T>' requires 1 type argument(s).
  inside: "???",
};
