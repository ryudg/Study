// 3.UnionsAndLiterals/02-6.narrowing.ts

let reasearcher = Math.random() > 0.5 ? "Newton" : 100;

typeof reasearcher === "string"
  ? reasearcher.toUpperCase()
  : reasearcher.toFixed();
