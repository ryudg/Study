// 5.Function/11-1.object.ts

let user = {
  name: "John Doe",
  age: 30,
};

let number = 1;

function greet(person: object) {
  console.log("Hello there!");
}

greet(user);

greet(number);
//    ^^^^^^ Argument of type 'number' is not assignable to parameter of type 'object'.
