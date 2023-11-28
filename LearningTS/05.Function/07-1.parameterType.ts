// 5.Function/07-1.parameterType.ts

let singer: (song: string) => string;

singer = function (song) {
  // 매개변수 song의 타입은 string
  return `Singing: ${song.toUpperCase()}`;
};
