// Section2/Item9/01-1.typeDeclaration.ts

interface Person {
  name: string;
}

const alice: Person = {};
//    ^^^^^ Property 'name' is missing in type '{}' but required in type 'Person'.
const bob = {} as Person; // 오류가 없다.
