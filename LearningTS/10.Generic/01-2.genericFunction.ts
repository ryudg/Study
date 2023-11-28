// 10.Generic/01-2.genericFunction.ts

function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// 타입은 (input: string) => void
logWrapper((input: string) => {
  console.log(input.length);
});

// 타입은 (input: unknown) => void
logWrapper((input) => {
  console.log(input.length);
  //          ^^^^^ 'input' is of type 'unknown'.
});
