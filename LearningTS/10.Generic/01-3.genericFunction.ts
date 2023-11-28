// 10.Generic/01-3.genericFunction.ts

function logWrapper<Input>(callback: (input: Input) => void) {
  return (input: Input) => {
    console.log("Input:", input);
    callback(input);
  };
}

// 타입은 (input: string) => void
logWrapper<string>((input) => {
  console.log(input.length);
});

logWrapper<string>((input: boolean) => {
  //               ^^^^^^^^^^^^^^^^^^^^^ Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
  //                                     Types of parameters 'input' and 'input' are incompatible.
  //                                     Type 'string' is not assignable to type 'boolean'.
});

// 타입은 ()
