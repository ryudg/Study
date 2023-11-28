let geneticist = Math.random() > 0.5 ? "Gregor Mendel" : undefined;

if (geneticist) {
  geneticist.toUpperCase();
}
geneticist.toUpperCase();
// ^^^^^^^^^^ 'geneticist' is possibly 'undefined'.

geneticist && geneticist.toUpperCase(); // string | undefined
geneticist?.toUpperCase(); // string | undefined
