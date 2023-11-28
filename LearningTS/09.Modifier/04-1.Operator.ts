// 9.Modifier/04-1.Operator.ts

interface Ratings {
  audience: number;
  critics: number;
}

function getRating(ratings: Ratings, key: string): number {
  return ratings[key];
  //     ^^^^^^^^^^^^ Element implicitly has an 'any' type because expression of type 'string' can't be used to index type 'Ratings'.
  //                  No index signature with a parameter of type 'string' was found on type 'Ratings'.
}

const ratings: Ratings = {
  audience: 95,
  critics: 98,
};

getRating(ratings, "audience");
getRating(ratings, "critics");

getRating(ratings, "not valid"); // 허용되지만 사용하면 안됨
