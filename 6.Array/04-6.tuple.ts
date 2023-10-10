// 6.Array/04-6.tuple.ts

function logTrio(name: string, value: [number, boolean]) {
  console.log(`${name} has ${value[0]} ${value[1]}`);
}

const trios: [string, [number, boolean]][] = [
  ["Amanitore", [1, true]],
  ["Æthelflæd", [2, false]],
  ["Ann E. Dunwoody", [3, true]],
];

trios.forEach((trio) => logTrio(...trio));

trios.forEach(logTrio);
//            ^^^^^^^ Argument of type '(name: string, value: [number, boolean]) => void' is not assignable to parameter of type '(value: [string, [number, boolean]], index: number, array: [string, [number, boolean]][]) => void'.
//                    Types of parameters 'name' and 'value' are incompatible.
//                    Type '[string, [number, boolean]]' is not assignable to type 'string'.
