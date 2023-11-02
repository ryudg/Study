// 5.Function/08-2.funtionTypeAlias.ts

type NumberToString = (input: number) => string;

function usesNumberToString(numberToString: NumberToString) {
  console.log(`The string is: ${numberToString(1234)}`);
}

usesNumberToString((input) => `${input}! Hooray!`);

usesNumberToString((input) => input * 2);
//                            ^^^^^^^^^^ Type 'number' is not assignable to type 'string'.
