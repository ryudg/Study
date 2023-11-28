// 5.Function/12-1.unknown.ts

function anyFunc(something: any) {
  something.toUpperCase();
}

function unknownFunc(something: unknown) {
  something.toUpperCase();
  //^^^^^^^^^ 'something' is of type 'unknown'.
}

let someRandomString = `
  {
    name: "John Doe",
    age: 30,
  }
`;

function safeParse(s: string): unknown {
  return JSON.parse(s);
}

// 'obj'를 사용할 때 조심해야 한다.
const obj = safeParse(someRandomString);

console.log(obj.age);
//          ^^^ 'obj' is of type 'unknown'.

if (typeof obj === "object" && obj !== null && "age" in obj) {
  console.log(obj.age);
}
