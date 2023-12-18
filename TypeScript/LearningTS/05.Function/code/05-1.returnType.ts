// 5.Function/05-1.returnType.ts

// 타입 (songs: string[]): number
function singSongs(songs: string[]) {
  for (const song of songs) {
    console.log(song);
  }

  return songs.length;
}
