// 10.Generic/01-1.genericFunction.ts

function identity<T>(input: T): T {
  return input;
}

const numeric = identity(1); // 타입은 1
const stringy = identity("hello"); // 타입은 'hello'

const identityArrow = <T>(input: T): T => input;

const numericArrow = identityArrow(123); // 타입은 123
const stringyArrow = identityArrow("world"); // 타입은 'world'
