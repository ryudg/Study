// 6.Array/04-9.tuple.ts

const unionArray = [1157, "Tomoe"]; // 타입은 (string | number)[]

const readonlyTuple = [1157, "Tomoe"] as const; // 타입은 readonly [1157, "Tomoe"]
