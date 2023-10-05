// 4.Object/06-3.objectUnion.ts

type PoemWithPages = {
  name: string;
  pages: number;
};

type PoemWithRhyme = {
  name: string;
  rhyme: boolean;
};

type Poem = PoemWithPages | PoemWithRhyme;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7 }
    : { name: "Her Kind", rhyme: true };

if ("pages" in poem) {
  poem.pages; // OK, poem은 PoemWithPages로 좁혀짐
} else {
  poem.rhyme; // OK, poem은 PoemWithRhyme으로 좁혀짐
}
