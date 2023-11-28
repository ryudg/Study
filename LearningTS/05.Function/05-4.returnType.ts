// 5.Function/05-4.returnType.ts

function getSongRecordingDate(song: string): Date | undefined {
  switch (song) {
    case "Strange Fruit":
      return new Date(1939, 3, 20);

    case "Greensleeves":
      // return undefined;
      return "unknown";
    // ^^^^^^ Type 'string' is not assignable to type 'Date'.

    default:
      return undefined;
  }
}
