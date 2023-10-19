// 9.Modifier/04-3.Operator.ts
interface Ratings {
  audience: number;
  critics: number;
}

function getCountKeyof(ratings: Ratings, key: keyof Ratings) {
  return ratings[key];
}

const ratings: Ratings = {
  audience: 95,
  critics: 98,
};

getCountKeyof(ratings, "audience");
getCountKeyof(ratings, "critics");

getCountKeyof(ratings, "not valid");
//                     ^^^^^^^^^^^ Argument of type '"not valid"' is not assignable to parameter of type 'keyof Ratings'.
