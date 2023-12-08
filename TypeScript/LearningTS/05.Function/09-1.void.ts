// 5.Function/09-1.void.ts

function logSongs(song: string | undefined): void {
  if (!song) {
    return;
  }

  console.log(`${song}`);

  return true;
  //^^^^^^ Type 'boolean' is not assignable to type 'void'.
}
