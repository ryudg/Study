// 9.Modifier/05-6.assertion.ts

const seasonCounts = new Map([
  ["I love John", 6.6],
  ["The Golden Girls", 7.7],
]);

const knownValue = seasonCounts.get("I love Lucy")!; // 타입은 number

console.log(knownValue.toFixed(1)); // 타입 오류는 아니지만, 런타임 오류가 발생한다.
