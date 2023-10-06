// 05.Function/02-3.optionalParameter.ts

function announceSongBy(song?: string, singer: string) {
  //                                   ^^^^^^ 'singer' is declared but its value is never read.
  //                                           A required parameter cannot follow an optional parameter.
  // ...
}
