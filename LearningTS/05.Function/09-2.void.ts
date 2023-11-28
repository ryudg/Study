// 5.Function/09-2.void.ts

let songLogger: (song: string) => void;

songLogger = (song) => {
  console.log(`${song}`);
};

songLogger("Heart of Glass");
