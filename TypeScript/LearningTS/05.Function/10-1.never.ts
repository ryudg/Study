// 5.Function/10-1.never.ts

function fail(messagae: string): never {
  throw new Error(`Invariant failure: ${messagae}`);
}

function workWithUnsafeParam(param: unknown) {
  if (typeof param !== "string") {
    fail(`param should be string, not ${typeof param}`);
  }

  param.toUpperCase();
}
