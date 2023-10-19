// 9.Modifier/05-5.assertion.ts

const seasonCounts = new Map([
  ["I love Lucy", 6.6],
  ["The Golden Girls", 7.7],
]);

const maybeValue = seasonCounts.get("I love Lucy"); // 타입은 number | undefined

console.log(maybeValue.toFixed(1));
//          ^^^^^^^^^^               'maybeValue' is possibly 'undefined'.

const knownValue = seasonCounts.get("I love Lucy")!; // 타입은 number

console.log(knownValue.toFixed(1));
