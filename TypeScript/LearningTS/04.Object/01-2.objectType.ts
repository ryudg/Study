// 4.Object/01-2.objectType.ts

let poetLater: {
  born: number;
  name: string;
};

poetLater = {
  born: 1935,
  name: "Mary Oliver",
};

poetLater = "Sappho";
// ^^^^^^^^^ Type 'string' is not assignable to type '{ born: number; name: string; }'.
