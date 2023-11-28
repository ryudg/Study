// 9.Modifier/05-9.assertion.ts

[0, ""]; // 타입은 (number | string)[]

[0, ""] as const; // 타입은 readonly [0, ""]
