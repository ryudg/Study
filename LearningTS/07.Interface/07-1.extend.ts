// 7.Interface/07-1.extend.ts

interface Writing {
  title: string;
}

interface Novella extends Writing {
  pages: number;
}

let myNovella: Novella = {
  pages: 195,
  title: "Ethan Frome",
};

let missingPages: Novella = {
  //^^^^^^^^^^^ Property 'pages' is missing in type '{ title: string; }' but required in type 'Novella'.
  title: "The Turn of the Screw",
};

let extraProperty: Novella = {
  pages: 300,
  style: "Naturalism",
  //^^^^^ Type '{ pages: number; style: string; startegy: string; }' is not assignable to type 'Novella'.
  //      Object literal may only specify known properties, and 'style' does not exist in type 'Novella'.
  startegy: "basline",
  //^^^^^^^^ Type '{ pages: number; startegy: string; style: string; }' is not assignable to type 'Novella'.
  //         Object literal may only specify known properties, and 'startegy' does not exist in type 'Novella'.
};
