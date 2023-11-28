// 10.Generic/00-1.any.ts

function identity(input: any) {
  return input;
}

let value = identity("hello"); // 타입은 any
