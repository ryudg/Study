// Section2/Item9/01-3.typeDeclaration.ts

interface Person {
  name: string;
}

const alice: Person = {
  name: "Alice",
  occupation: "TypeScript developer",
  //^^^^^^^^^^ Type '{ name: string; occupation: string; }' is not assignable to type 'Person'.
  //           Object literal may only specify known properties, and 'occupation' does not exist in type 'Person'.
};
const bob = {
  name: "Bob",
  occupation: "JavaScript developer",
} as Person; // 오류가 없다.
