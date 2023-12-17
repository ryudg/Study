// 4.Object/01-3.objectType.ts

type Poet = {
  born: number;
  name: string;
};

let poetLater: Poet;

poetLater = {
  born: 1935,
  name: "Sara Teasdale",
};

poetLater = "Emily Dickinson";
// ^^^^^^^^^ Type 'string' is not assignable to type 'Poet'.
