// 4.Object/06-1.objectUnion.ts

const poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhyme: true };

poem.name; // 타입은 string
poem.pages; // 타입은 number | undefined
poem.rhyme; // 타입은 boolean | undefined
