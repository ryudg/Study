// 10.Generic/06-1.genericModifier.ts

interface Quote<T = string> {
  value: T;
}

let explicit: Quote<number> = { value: 123 };

let implicit: Quote = { value: "implicit" };

let mismatch: Quote = { value: 123 };
//                      ^^^^^ Type 'number' is not assignable to type 'string'.
