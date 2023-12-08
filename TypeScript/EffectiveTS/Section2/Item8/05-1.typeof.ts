// Section2/Item8/05-1.typeof.ts

interface Person {
  first: string;
  last: string;
}

const p: Person = { first: "Jane", last: "Jacobs" };

// 일부 함수에서는 타입과 값이 반복적으로 번갈아 가며 나올 수도 있다.
function email(p: Person, subject: string, body: string): Response {
  // ...
}

type T1 = typeof p; // 타입은 Person
type T2 = typeof email; // 타입은 (p: Person, subject: string, body: string) => Response

const v1 = typeof p; // 값은 "object"
const v2 = typeof email; // 값은 "function"
