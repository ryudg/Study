// 05.Function/02-2.optionalParameter.ts

function announceSongBy(song: string, singer: string | undefined) {
  // ...
}

announceSongBy("Greensleeves");
// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^ Expected 2 arguments, but got 1.
//                                02-2.optionalParameter.ts(3, 38): An argument for 'singer' was not provided.

announceSongBy("Greensleeves", undefined);
announceSongBy("Chandelier", "Sia");
