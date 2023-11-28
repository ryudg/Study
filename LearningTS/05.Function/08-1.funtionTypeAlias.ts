// 5.Function/08-1.funtionTypeAlias.ts

type StringToNumber = (input: string) => number;

let stringToNumber: StringToNumber;
stringToNumber = (input) => input.length;

stringToNumber = (input) => input.toUpperCase();
//                          ^^^^^^^^^^^^^^^^^^^ Type 'string' is not assignable to type 'number'.ts(2322)
