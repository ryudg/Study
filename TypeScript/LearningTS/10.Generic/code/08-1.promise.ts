// 10.Generic/08-1.promise.ts

class PromiseLike<Value> {
  constructor(
    executor: (
      resolve: (value: Value) => void,
      reject: (reason: unknown) => void
    ) => void
  ) {
    // ...
  }
}
