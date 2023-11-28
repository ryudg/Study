// Section2/Item7/04-3.intersection.ts

interface Person {
  name: string;
}

interface Lifespan {
  birth: Date;
  death?: Date;
}

type K = keyof (Person | Lifespan);
