// 10.Generic/08-5.promise.ts

function logInput<Input extends string>(input: Input) {
  console.log("Hello, wolrd", input);
}
