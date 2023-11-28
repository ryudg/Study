// Section2/Item7/04-4.intersection.ts

interface Person {
  name: string;
}

interface PersonSpan extends Person {
  birth: Date;
  death?: Date;
}
