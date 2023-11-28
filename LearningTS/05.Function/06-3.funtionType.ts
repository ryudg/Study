// 5.Function/06-3.funtionType.ts

const songs = ["Juice", "Shake It Off", "What's Up"];

function runOnSongs(getSongAt: (index: number) => string) {
  for (let i = 0; i < songs.length; i += 1) {
    console.log(getSongAt(i));
  }
}

function getSongAt(index: number) {
  return `${songs[index]}`;
}
runOnSongs(getSongAt);

function logSong(song: string) {
  return `${song}`;
}
runOnSongs(logSong);
//         ^^^^^^^ Argument of type '(song: string) => string' is not assignable to parameter of type '(index: number) => string'.
//                 Types of parameters 'song' and 'index' are incompatible.
//                 Type 'number' is not assignable to type 'string'.
