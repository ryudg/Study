// 6.Array/01-4.array.ts

let stringOrArrayOfNumbers: string | number[]; // 타입은 string 또는 number의 배열
stringOrArrayOfNumbers = "123";
stringOrArrayOfNumbers = [1, 2, 3];

let arrayOfStringOrNumbers: (string | number)[]; // 타입은 각각 string 또는 number인 요소의 배열
arrayOfStringOrNumbers = ["123", 456];
arrayOfStringOrNumbers = [123, "456"];
