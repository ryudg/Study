// 4.Object/08-2.intersection.ts

type ShortPoem = { author: string } & (
  | { kigo: string; type: "haiku" }
  | { meter: number; type: "villanelle" }
);

const morningGlory: ShortPoem = {
  author: "Fukuda Chiyo-ni",
  kigo: "Morning Glory",
  type: "haiku",
};

const oneArt: ShortPoem = {
  //  ^^^^^^ Type '{ author: string; type: "villanelle"; }' is not assignable to type 'ShortPoem'.
  //         Type '{ author: string; type: "villanelle"; }' is not assignable to type '{ author: string; } & { meter: number; type: "villanelle"; }'.
  //         Property 'meter' is missing in type '{ author: string; type: "villanelle"; }' but required in type '{ meter: number; type: "villanelle"; }'.

  author: "Elizabeth Bishop",
  type: "villanelle",
};
