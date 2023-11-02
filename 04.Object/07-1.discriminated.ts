// 4.Object/07-1.discriminated.ts

type PoemWithPages = {
  name: string;
  pages: number;
  type: "pages";
};

type PoemWithRhyme = {
  name: string;
  rhyme: boolean;
  type: "rhyme";
};

type Poem = PoemWithPages | PoemWithRhyme;

const poem: Poem =
  Math.random() > 0.5
    ? { name: "The Double Image", pages: 7, type: "pages" }
    : { name: "Her Kind", rhyme: true, type: "rhyme" };

if (poem.type === "pages") {
  console.log(`It's got pages: ${poem.pages}`);
} else {
  console.log(`It rhyme: ${poem.rhyme}`);
}

poem.type; // 타입은 "pages" | "rhyme

poem.pages;
//   ^^^^^ Property 'pages' does not exist on type 'Poem'.
//         Property 'pages' does not exist on type 'PoemWithRhyme'.
