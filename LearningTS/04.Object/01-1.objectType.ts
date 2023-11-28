// 4.Object/01-1.objectType.ts

const poet = {
  born: 1935,
  name: "Mary Oliver",
};

poet["born"]; // 타입은 number
poet.name; // 타입은 string

poet.end;
//   ^^^ Property 'end' does not exist on type '{ born: number; name: string; }'.
