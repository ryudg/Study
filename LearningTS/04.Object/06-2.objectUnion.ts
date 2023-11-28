// 4.Object/06-2.objectUnion.ts

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

poem.name; // OK

poem.pages;
//   ^^^^^ Property 'pages' does not exist on type 'Poem'.
//         Property 'pages' does not exist on type 'PoemWithRhyme'.

poem.rhyme;
//   ^^^^^ Property 'rhyme' does not exist on type 'Poem'.
//         Property 'rhyme' does not exist on type 'PoemWithPages'.
