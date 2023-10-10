// 6.Array/04-1.spread.ts

let yearAndWarrior: [number, string];

yearAndWarrior = [530, "Tomyris"];

yearAndWarrior = [false, "Tomyris"];
//                ^^^^^ Type 'boolean' is not assignable to type 'number'.

yearAndWarrior = [530];
// ^^^^^^^^^^^^^^ Type '[number]' is not assignable to type '[number, string]'.
//                Source has 1 element(s) but target requires 2.
