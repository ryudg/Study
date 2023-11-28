// 5.Function/05-3.returnType.ts

function singSongsRecursive(songs: string[], count = 0): number {
  return songs.length ? singSongsRecursive(songs.slice(1), count + 1) : count;
}

const arrowSingSongsRecursive = (songs: string[], count = 0): number =>
  songs.length ? arrowSingSongsRecursive(songs.slice(1), count + 1) : count;
