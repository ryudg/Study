// 04.Object/05-1.optionalType.ts

type Book = {
  author?: string;
  pages: number;
};

const ok: Book = {
  author: "Rita Dove",
  pages: 80,
};

const missing: Book = {
  //    ^^^^^^^ Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.ts(2741)
  //            05-1.optionalType.ts(5, 3): 'pages' is declared here.
  author: "Rita Dove",
};
