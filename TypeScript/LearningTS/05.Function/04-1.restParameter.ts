// 5.Function/04-1.restParameter.ts

function singAllTheSongs(singer: string, ...songs: string[]) {
  for (const song of songs) {
    console.log(`${song} by ${singer}`);
  }
}

singAllTheSongs("Alicia Keys");
singAllTheSongs("Lady Gaga", "Bad Romance", "Just Dance", "Poker Face");

singAllTheSongs("Adele", 2000);
//                       ^^^^ Argument of type 'number' is not assignable to parameter of type 'string'.
