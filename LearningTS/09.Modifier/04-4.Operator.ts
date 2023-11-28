// 9.Modifier/04-4.Operator.ts

const original = {
  medium: "movie",
  title: "Mean Girls",
};

let adaptation: typeof original;

if (Math.random() > 0.5) {
  adaptation = {
    ...original,
    medium: "play",
  };
} else {
  adaptation = {
    ...original,
    medium: 2,
    //^^^^^^ Type 'number' is not assignable to type 'string'.
  };
}
