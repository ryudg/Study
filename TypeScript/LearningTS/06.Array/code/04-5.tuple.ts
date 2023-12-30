// 6.Array/04-5.tuple.ts

function logPair(name: string, value: number) {
  console.log(`${name} has ${value}`);
}

const pairArray = ["Amage", 1];
logPair(...pairArray);
//      ^^^^^^^^^^^^ A spread argument must either have a tuple type or be passed to a rest parameter.

const pairTupleIncorrect: [number, string] = [1, "Amage"];
logPair(...pairTupleIncorrect);
//      ^^^^^^^^^^^^^^^^^^^^^ Argument of type 'number' is not assignable to parameter of type 'string'.

const pairTupleCorrect: [string, number] = ["Amage", 1];
logPair(...pairTupleCorrect);
