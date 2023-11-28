// 7.Interface/05-2.callSignature.ts

interface FunctionWithCount {
  count: number;
  (): void;
}

let hasCallCount: FunctionWithCount;

function keepTrackOfCalls() {
  keepTrackOfCalls.count += 1;
  console.log(`I'v been called ${keepTrackOfCalls.count} times!`);
}

keepTrackOfCalls.count = 0;

hasCallCount = keepTrackOfCalls;

function doesNotHaveCount() {
  console.log("No idea!");
}

hasCallCount = doesNotHaveCount;
// ^^^^^^^^^^^^ Property 'count' is missing in type '() => void' but required in type 'FunctionWithCount'.
