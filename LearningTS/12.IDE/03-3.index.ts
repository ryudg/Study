const fruits = {
  apple: 10,
  orange: 20,
  banana: 30,
};

type NewType = typeof fruits;

export type Fruit = keyof NewType;
