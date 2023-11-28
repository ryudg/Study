// 4.Object/04-2.nastedObject.ts

type Author = {
  firstName: string;
  lastName: string;
};

type Poem = {
  author: Author;
  name: string;
};

const poemMatch: Poem = {
  author: {
    firstName: "Sylvia",
    lastName: "Plath",
  },
  name: "Lady Lazarus",
};

const poemMismatch: Poem = {
  author: {
    name: "Sylvia Plath",
    //  ^^^^  Type '{ name: string; }' is not assignable to type 'Author'.
    //        Object literal may only specify known properties, and 'name' does not exist in type 'Author'.
    //        04-2.nastedObject.ts(9, 3): The expected type comes from property 'author' which is declared here on type 'Poem'
  },
  name: "Tulips",
};
