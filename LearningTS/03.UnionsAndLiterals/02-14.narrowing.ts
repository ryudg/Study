// 3.UnionsAndLiterals/02-14.narrowing.ts

let x = Math.random() < 0.5 ? 10 : "hello world!"; // 선언할 때 let x: string | number 으로 지정
x = 1;
console.log(x);

x = "goodbye!";
console.log(x);

x = true;
// ^ Type 'boolean' is not assignable to type 'string | number'.
