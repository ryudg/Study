// 6.Array/04-4.tuple.ts

const tupleThree: [boolean, number, string] = [false, 1583, "Nzinga"];

const tupleTwoExact: [boolean, number] = [tupleThree[0], tupleThree[1]];

const tupleTwoExtra: [boolean, number] = tupleThree;
//    ^^^^^^^^^^^^^ Type '[boolean, number, string]' is not assignable to type '[boolean, number]'.
//                  Source has 3 element(s) but target allows only 2.
