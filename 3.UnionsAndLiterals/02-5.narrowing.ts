// 3.UnionsAndLiterals/02-5.narrowing.ts

let reasearcher = Math.random() > 0.5 ? "Newton" : 100;

if (!(typeof reasearcher === "string")) {
  reasearcher.toFixed();
} else {
  reasearcher.toUpperCase();
}
