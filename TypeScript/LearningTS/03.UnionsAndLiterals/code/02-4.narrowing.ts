// 3.UnionsAndLiterals/02-4.narrowing.ts

let reasearcher = Math.random() > 0.5 ? "Newton" : 100;

if (typeof reasearcher === "string") {
  reasearcher.toUpperCase(); // OK
}
