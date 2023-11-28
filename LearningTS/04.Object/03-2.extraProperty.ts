// 4.Object/03-2.extraProperty.ts

type Poet = {
  born: number;
  name: string;
};

const extraProperty = {
  activity: "walking",
  born: 1935,
  name: "Mary Oliver",
};

const extraPropertyButOK: Poet = extraProperty;
