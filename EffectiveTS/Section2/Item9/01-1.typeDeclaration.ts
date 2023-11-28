// Section2/Item9/01-1.typeDeclaration.ts

interface Person {
  name: string;
}

const alice: Person = { name: "Alice" };
const bob = { name: "Bob" } as Person;
