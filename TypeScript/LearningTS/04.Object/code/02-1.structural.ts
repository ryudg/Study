// 4.Object/02-1.structural.ts

type WithFirstName = {
  firstName: string;
};

type WithLastName = {
  lastName: string;
};

const hasBoth = {
  firstName: "Lucille",
  lastName: "Clifton",
};

let WithFirstName: WithFirstName = hasBoth; // OK, hasBoth는 'stirng' 타입의 'firstName' 프로퍼티를 가지고 있다.

let WithLastName: WithLastName = hasBoth; // OK, hasBoth는 'stirng' 타입의 'lastName' 프로퍼티를 가지고 있다.
