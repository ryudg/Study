// 5.Function/07-2.parameterType.ts

const songs = ["Call Me", "Jolene", "The Chain"];

songs.forEach(function (song, index) {
  // 매개변수 song의 타입은 string
  // 매개변수 index의 타입은 number
  console.log(`${song} is at index ${index}`);
});
