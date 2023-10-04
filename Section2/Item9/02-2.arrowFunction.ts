// Section2/Item9/02-2.arrowFunction.ts

interface Person {
  name: string;
}

/*
const people = ["alice", "bob", "jan"].map((name) => {
  const person: Person = { name };
  return person;
});
// 타입은 Person[]이다.
*/

// const people = ["alice", "bob", "jan"].map((name): Person => ({ name }));

const people: Person[] = ["alice", "bob", "jan"].map(
  (name): Person => ({ name })
);
