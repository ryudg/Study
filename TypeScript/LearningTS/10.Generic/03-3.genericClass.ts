// 10.Generic/03-3.genericClass.ts

class CurriedCallback<Input> {
  #callback: (input: Input) => void;

  constructor(callback: (input: Input) => void) {
    this.#callback = (input: Input) => {
      console.log("Input:", input);
      callback(input);
    };
  }
  call(input: Input) {
    this.#callback(input);
  }
}

// 타입은 CurriedCallback<string>
new CurriedCallback<string>((input) => {
  console.log(input.length);
});

new CurriedCallback<string>((input: boolean) => {});
//                          ^^^^^^^^^^^^^^^^^^^^^ Argument of type '(input: boolean) => void' is not assignable to parameter of type '(input: string) => void'.
//                                                Types of parameters 'input' and 'input' are incompatible.
//                                                Type 'string' is not assignable to type 'boolean'.
