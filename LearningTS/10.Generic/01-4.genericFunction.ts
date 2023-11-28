// 10.Generic/01-4.genericFunction.ts

function makeTuple<First, Second>(first: First, second: Second) {
  return [first, second] as const;
}

let tuple = makeTuple(true, "abc"); // 타입은 readonly [boolean, string]
