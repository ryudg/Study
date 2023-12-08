// 10.Generic/08-3.promise.ts

// 타입은 Promise<string>
const textEventually = new Promise<string>((resolve) => {
  setTimeout(() => resolve("Done!"), 1000);
});

// 타입은 Promise<number>
const lengthEventually = textEventually.then((text) => text.length);
