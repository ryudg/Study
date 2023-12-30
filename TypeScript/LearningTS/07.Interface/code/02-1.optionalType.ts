// 7.Interface/02-1.optionalType.ts

interface Book {
  author?: string;
  pages: number;
}

const ok: Book = {
  author: "Rita Dove",
  pages: 200,
};

const missing: Book = {
  pages: 300,
};

const ng: Book = {
  //  ^^ Property 'pages' is missing in type '{ author: string; }' but required in type 'Book'.
  author: "Rita Dove",
};
