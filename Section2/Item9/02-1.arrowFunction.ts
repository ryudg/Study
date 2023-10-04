// Section2/Item9/02-1.arrowFunction.ts

interface Person {
  name: string;
}

// const people = ["alice", "bob", "jan"].map((name) => ({ name }));
// Person[] 타입을 원했지만, { name: string }[] 타입이 된다.

const people = ["alice", "bob", "jan"].map((name) => ({ name } as Person));
// 타입이 Person[]가 된다.
