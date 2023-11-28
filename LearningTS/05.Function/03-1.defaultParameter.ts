// 5.Function/03-1.defaultParameter.ts

function rateSong(song: string, rating = 0) {
  console.log(`${song} gets ${rating}/5 stars!`);
}

rateSong("Photograph");
rateSong("Set Fire to the Rain", 5);
rateSong("Set Fire to the Rain", undefined);

rateSong("At Last!", "100");
//                   ^^^^^ Argument of type 'string' is not assignable to parameter of type 'number'.
