// 6.Array/04-3.tuple.ts

const pairLoos = [false, 123]; // 타입은 (boolean | number)[]

const pairTupleLoose: [boolean, number] = pairLoos;
//    ^^^^^^^^^^^^^^ Type '(number | boolean)[]' is not assignable to type '[boolean, number]'.
//                   Target requires 2 element(s) but source may have fewer.
