// Section2/Item7/04-2.intersection.ts

interface Person {
  name: string;
}

interface Lifespan {
  birth: Date;
  death?: Date;
}

type PersonSpan = Person & Lifespan;

const ps: PersonSpan = {
  name: "Alan Turing",
  birth: new Date(1912, 6, 23),
  death: new Date(1954, 6, 7),
};
