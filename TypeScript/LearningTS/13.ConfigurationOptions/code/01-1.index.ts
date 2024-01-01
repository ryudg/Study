interface Person {
  name: string;
  age: number;
}

const person: Person = {
  name: "Mark",
  age: 35,
};

const personError: Person = {
  name: "Mark",
  age: "35",
};
