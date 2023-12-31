// 10.Generic/02-1.genericInterface.ts

interface Box<T> {
  inside: T;
}

let stringyBox: Box<string> = {
  inside: "abc",
};

let numberBox: Box<number> = {
  inside: 123,
};

let incorrectBox: Box<number> = {
  inside: false,
  //^^^^^^ Type 'boolean' is not assignable to type 'number'.
};
