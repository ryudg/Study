// 5.Function/06-2.funtionType.ts

let inputAndOutput: (song: string[], count?: number) => number;

inputAndOutput = (songs: string[], count: number = 1): number =>
  songs.length * count;
