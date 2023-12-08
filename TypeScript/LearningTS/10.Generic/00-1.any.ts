// 10.Generic/00-1.any.ts

function identity(input) {
  return input;
}

identity(1);
identity("1");
identity(true);
identity(null);
identity(undefined);
identity({ quote: "I think your self emerges more clearly through time." });
