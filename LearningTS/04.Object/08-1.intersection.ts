// 4.Object/08-1.intersection.ts

type Artwork = {
  genre: string;
  name: string;
};

type Writing = {
  pages: number;
  name: string;
};

type WrittenArt = Artwork & Writing; // 타입은 { genre: string; name: string; pages: number; }
