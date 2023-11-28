// 10.Generic/08-2.promise.ts

// 타입은 Promise<unknown>
const resolvesUnknown = new Promise((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입은 Promise<string>
const resolveString = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});
