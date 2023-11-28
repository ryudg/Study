// 10.Generic/01-5.genericFunction.ts

function makePair<Key, Value>(key: Key, value: Value) {
  return { key, value };
}

makePair("abc", 123); // 타입은 { key: string, value: number }

makePair<string, number>("abc", 123); // 타입은 { key: string, value: number }
makePair<"abc", 123>("abc", 123); // 타입은 { key: "abc", value: 123 }

makePair<string>("abc", 123);
//       ^^^^^^ Expected 2 type arguments, but got 1.
