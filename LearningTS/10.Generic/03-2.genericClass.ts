// 10.Generic/03-2.genericClass.ts

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
const resultString = new CurriedCallback((input: string) =>
  console.log(input.length)
);

// 타입은 CurriedCallback<unknown>
const resultUnknown = new CurriedCallback((input) => console.log(input.length));
