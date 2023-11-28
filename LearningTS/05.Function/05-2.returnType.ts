// 5.Function/05-2.returnType.ts

// 타입 (songs: string[], index: number): string | undefined
function getSongAt(songs: string[], index: number) {
  return index < songs.length ? songs[index] : undefined;
}
