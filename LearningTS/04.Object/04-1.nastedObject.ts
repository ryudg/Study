// 4.Object/04-1.nastedObject.ts

type Poem = {
  author: {
    firstName: string;
    lastName: string;
  };
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
    //  ^^^^ Type '{ name: string; }' is not assignable to type '{ firstName: string; lastName: string; }'.
    //       Object literal may only specify known properties, and 'name' does not exist in type '{ firstName: string; lastName: string; }'.
    //       04-1.nastedObject.ts(2, 3): The expected type comes from property 'author' which is declared here on type 'Poem'
  },
  name: "Tulips",
};
