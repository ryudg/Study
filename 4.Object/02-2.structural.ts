// 4.Object/02-2.structural.ts

type FisrtAndNames = {
  fisrt: string;
  last: string;
};

const hasBoth: FisrtAndNames = {
  fisrt: "Sarojini",
  last: "Naidu",
};

const hasOnlyOne: FisrtAndNames = {
  //  ^^^^^^^^^^ Property 'last' is missing in type '{ fisrt: string; }' but required in type 'FisrtAndNames'.
  //             02-2.structural.ts(5, 3): 'last' is declared here.
  fisrt: "Sappho",
};
