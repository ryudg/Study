// 13.ConfigurationOptions/06-4.type.ts

function checkOnNumber(constainsA: (input: number | string) => boolean) {
  return constainsA(1337);
}

function stringContainsA(input: string) {
  return !!input.match(/a/i);
}

checkOnNumber(stringContainsA);
//            ^^^^^^^^^^^^^^^ Argument of type '(input: string) => boolean' is not assignable to parameter of type '(input: string | number) => boolean'.
//                            Types of parameters 'input' and 'input' are incompatible.
//                            Type 'string | number' is not assignable to type 'string'.
//                            Type 'number' is not assignable to type 'string'.
