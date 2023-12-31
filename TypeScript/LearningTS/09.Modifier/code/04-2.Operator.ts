// 9.Modifier/04-2.Operator.ts

interface Ratings {
  audience: number;
  critics: number;
}

function getRating(ratings: Ratings, key: "audience" | "critics"): number {
  return ratings[key];
}

const ratings: Ratings = {
  audience: 95,
  critics: 98,
};

getRating(ratings, "audience");
getRating(ratings, "critics");

getRating(ratings, "not valid");
//                 ^^^^^^^^^^^ Argument of type '"not valid"' is not assignable to parameter of type '"audience" | "critics"'.
