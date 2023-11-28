// 9.Modifier/05-11.assertion.ts

interface Joke {
  quote: string;
  style: "story" | "one-liner";
}

function tellJoke(joke: Joke) {
  if (joke.style === "one-liner") {
    console.log(joke.quote);
  } else {
    console.log(joke.quote.split("\n"));
  }
}

// 타입은 { quote: string; style: "one-liner"; }
const narrowJoke = {
  quote: "If you stay alive for no other reason do it for spite.",
  style: "one-liner" as const,
};
tellJoke(narrowJoke);

// 타입은 { quote: string; style: string; }
const wideObject = {
  quote: "Time flies when you are anxious!",
  style: "one-liner",
};

tellJoke(wideObject);
//       ^^^^^^^^^^ Argument of type '{ quote: string; style: string; }' is not assignable to parameter of type 'Joke'.
//                  Types of property 'style' are incompatible.
//                  Type 'string' is not assignable to type '"story" | "one-liner"'.
