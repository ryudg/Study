// 05.Function/02-1.optionalParameter.ts

function announceSong(song: string, singer?: string) {
  console.log(`Song: ${song}`);

  if (singer) {
    console.log(`Singer: ${singer}`);
  }
}

announceSong("Greensleeves");
announceSong("Greensleeves", undefined);
announceSong("Chandelier", "Sia");
