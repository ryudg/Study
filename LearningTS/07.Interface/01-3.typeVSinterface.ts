// 7.Interface/01-3.typeVSinterface.ts

interface Poet {
  born: number;
  name: string;
}

let valueLater: Poet;

valueLater = {
  born: 1935,
  name: "Sara Teasdale",
};

valueLater = "Emily Dickinson";
// ^^^^^^^^^^ Type 'string' is not assignable to type 'Poet'.

valueLater = {
  born: true,
  //^^^^ Type 'boolean' is not assignable to type 'number'.

  name: "Sara Teasdale",
};
